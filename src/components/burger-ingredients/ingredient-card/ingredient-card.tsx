import { useMemo } from 'react';
import styles from './ingredient-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../../utils/types';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

type TCardProps = {
  data: TIngredient;
};

const IngredientCard = ({ data }: TCardProps) => {
  const location = useLocation();
  const {_id, image, name, price} = data;
  // @ts-ignore
  const { bun, ingredients: constructorIngredients } = useSelector((state) => state.burgerConstructor);

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  
  const count = useMemo<number>(() => {
    if (bun && bun._id === _id) {
      return 2;
    }
   return constructorIngredients
    .reduce((acc: number, item: TIngredient) => item._id === _id ? acc + 1 : acc, 0);
  }, [bun, constructorIngredients]);

  return (
      <Link
        to={`/ingredients/${_id}`}
        state={{ background: location }}
        className={styles.link}
      >
        <div
          ref={dragRef}
          className={ `${styles.card} ml-4 mr-2 mb-8 ${isDrag ? styles.isDrag : ''}` }
        >
          { count > 0 && <Counter count={count} size="default" extraClass="m-1" /> }
          <img src={image} alt={name} className='ml-4 mr-4'/>
          <div className={ `${styles.priceContainer} mt-1 mb-1`}>
            <span className={ `text text_type_digits-default ${styles.price}`}>{price}</span>
            <CurrencyIcon type="primary" />
          </div>
          <div className={ `${styles.cardName} text text_type_main-default`}>{name}</div>
        </div>
      </Link>
  )
}

export default IngredientCard;