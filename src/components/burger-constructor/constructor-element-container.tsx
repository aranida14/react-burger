import styles from './constructor-element-container.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { deleteIngredient, moveIngredient } from '../../services/burger-constructor-slice';
import { useRef } from 'react';
import { TIngredientWithUuid } from '../../utils/types';

type TContainerProps = {
  ingredient: TIngredientWithUuid;
  index: number;
}

const ConstructorElementContainer = ({ ingredient, index }: TContainerProps) => {
  const dispatch = useDispatch();
  const handleIngredientDelete = (id: string) => {
    dispatch(deleteIngredient(id));
  }
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDrag }, dragRef] = useDrag({
    type: "constructorIngredient",
    item: { ingredient, index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "constructorIngredient",
    hover: (item: TContainerProps, monitor) => {
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
      const clientOffset = monitor.getClientOffset() as XYCoord;
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
        handleClose={() => handleIngredientDelete(ingredient.uuid)}
      />
    </div>);
}

export default ConstructorElementContainer;