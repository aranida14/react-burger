import React from 'react';
import styles from './ingredient-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../../modal/modal';
import { ingredientPropTypes } from '../../../utils/types';
import IngredientDetails from '../../ingredient-details/ingredient-details';

const IngredientCard = ({ data }) => {
  const [showModal, setShowModal] = React.useState(false);
  const {_id, image, name, price} = data;

  return (
      <>
        <li className={ styles.card + ' ml-4 mr-2 mb-10'} onClick={() => setShowModal(true)}>
          { _id === '60666c42cc7b410027a1a9b1' && <Counter count={2} size="default" extraClass="m-1" /> }
          <img src={image} alt={name} className='ml-4 mr-4'/>
          <div className={ `${styles.priceContainer} mt-1 mb-1`}>
            <span className={ `text text_type_digits-default ${styles.price}`}>{price}</span>
            <CurrencyIcon type="primary" />
          </div>
          <div className={ `${styles.cardName} text text_type_main-default`}>{name}</div>
        </li>
        
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Детали ингредиента">
          <IngredientDetails data={data}/>          
        </Modal>
      </>
  )
}

IngredientCard.propTypes = {
  data: ingredientPropTypes
};

export default IngredientCard;