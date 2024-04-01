import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from './ingredients-group/ingredients-group'; 


function BurgerIngredients({ingredients}) {
  const [current, setCurrent] = React.useState('bun');

  const buns = ingredients.filter((item) => item.type === 'bun');
  const sauces = ingredients.filter((item) => item.type === 'sauce');
  const main = ingredients.filter((item) => item.type === 'main');
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
