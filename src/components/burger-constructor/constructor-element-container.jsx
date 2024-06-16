import styles from './constructor-element-container.module.css';
import PropTypes from 'prop-types';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/types';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { deleteIngredient, moveIngredient } from '../../services/burger-constructor-slice';
import { useRef } from 'react';

const ConstructorElementContainer = ({ ingredient, index }) => {
  const dispatch = useDispatch();
  const handleIngredientDelete = (e, id) => {
    dispatch(deleteIngredient(id));
  }
  const ref = useRef(null);
  const [{ isDrag }, dragRef] = useDrag({
    type: "constructorIngredient",
    item: { ingredient, index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "constructorIngredient",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveIngredient({fromIndex: dragIndex, toIndex: hoverIndex }));
      item.index = hoverIndex;
    }
  });
  dragRef(dropRef(ref));

  return (
    <div ref={ref} className={ `${styles.ingredientContainer} ${isDrag ? styles.isDrag : ''}` }>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={(e) => handleIngredientDelete(e, ingredient.uuid)}
      />
    </div>);
}

ConstructorElementContainer.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  index: PropTypes.number.isRequired,
};


export default ConstructorElementContainer;