import React from 'react';
import styles from './burger-ingredients.module.css';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { data, dataPropTypes } from '../../utils/data';
import PropTypes from 'prop-types';

function IngredientCard(props) {
  const {_id, image, name, price} = props.data;
  return (
      <li className={ styles.card + ' ml-4 mr-2 mb-10'}>
      {/* <li className={ styles.card + ' mb-10'}> */}
        { _id === '60666c42cc7b410027a1a9b1' && <Counter count={2} size="default" extraClass="m-1" /> }
        <img src={image} alt={name} className='ml-4 mr-4'/>
        <div className={ `${styles.priceContainer} mt-1 mb-1`}>
          <span className={ `text text_type_digits-default ${styles.price}`}>{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <div className={ `${styles.cardName} text text_type_main-default`}>{name}</div>
      </li>
  )
}

IngredientCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,    
  })
}; 


function IngredientsGroup(props) {
  return (
    <li className={styles.group}>
      <h2 className={ `${styles.groupTitle } text text_type_main-medium mb-6` }>{props.name}</h2>
      <ul className={styles.groupList}>
        {
          props.data.map((ingredient, index) => ( 
            <IngredientCard key={ingredient._id} data={ingredient}/>
          ))
        } 
      </ul>
    </li>
  )
}

IngredientsGroup.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(dataPropTypes).isRequired,
};

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('bun');

  const buns = data.filter((item) => item.type === 'bun');
  const sauces = data.filter((item) => item.type === 'sauce');
  const main = data.filter((item) => item.type === 'main');
  return (
    <section className={ `${styles.section} mr-10` }>
      <h1 className={ `${styles.title} mt-10 text text_type_main-large` }>Соберите бургер</h1>
      {/* тут будут ингредиенты для бургера BurgerIngredients */}

      <div className={ `${styles.tabs} mt-5 mb-10` }>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <ul className={ styles.ingredientsList }>
        <IngredientsGroup name="Булки" data={buns} key="bun"/>
        <IngredientsGroup name="Соусы" data={sauces} key="sauce"/>
        <IngredientsGroup name="Начинки" data={main} key="main"/>
      </ul>
    </section>
  );
}

export default BurgerIngredients;
