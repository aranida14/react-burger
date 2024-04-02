import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from './ingredients-group/ingredients-group'; 
import { ingredientPropTypes } from '../../utils/types';

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = React.useState('bun');

  const buns = React.useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
  const sauces = React.useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);
  const main = React.useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);
  return (
    <section className={ `${styles.section} mr-10` }>
      <h1 className={ `${styles.title} mt-10 text text_type_main-large` }>Соберите бургер</h1>
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
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export default BurgerIngredients;
