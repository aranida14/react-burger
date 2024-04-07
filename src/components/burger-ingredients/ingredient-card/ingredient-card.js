import { useMemo } from 'react';
import styles from './ingredient-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modal/modal';
import { ingredientPropTypes } from '../../../utils/types';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import { useSelector, useDispatch } from 'react-redux';
import { showIngredient, closeIngredient } from '../../../services/current-ingredient-slice';

const IngredientCard = ({ data }) => {
  const {_id, image, name, price} = data;
  const { bun, ingredients: constructorIngredients } = useSelector((state) => state.burgerConstructor);

  const count = useMemo(() => {
    if (bun && bun._id === _id) {
      return 2;
    }
   return constructorIngredients
    .reduce((acc, item) => item._id === _id ? acc + 1 : acc, 0);
  }, [bun, constructorIngredients]);

  const currentIngredient = useSelector((state) => state.currentIngredient.data);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(showIngredient(data));
  };

  const onClose = () => {
    dispatch(closeIngredient());
  };

  return (
      <>
        <li className={ styles.card + ' ml-4 mr-2 mb-10'} onClick={handleClick}>
          { count > 0 && <Counter count={count} size="default" extraClass="m-1" /> }
          <img src={image} alt={name} className='ml-4 mr-4'/>
          <div className={ `${styles.priceContainer} mt-1 mb-1`}>
            <span className={ `text text_type_digits-default ${styles.price}`}>{price}</span>
            <CurrencyIcon type="primary" />
          </div>
          <div className={ `${styles.cardName} text text_type_main-default`}>{name}</div>
        </li>
        
        <Modal
          isOpen={currentIngredient && currentIngredient._id === _id}
          onClose={onClose}
          title="Детали ингредиента"
        >
          <IngredientDetails />
        </Modal>
      </>
  )
}

IngredientCard.propTypes = {
  data: ingredientPropTypes
};

export default IngredientCard;