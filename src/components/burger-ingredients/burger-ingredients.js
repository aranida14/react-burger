import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from './ingredients-group/ingredients-group'; 

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('bun');

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
        <IngredientsGroup name="Булки" type="bun"/>
        <IngredientsGroup name="Соусы" type="sauce"/>
        <IngredientsGroup name="Начинки" type="main"/>
      </ul>
    </section>
  );
};

export default BurgerIngredients;
