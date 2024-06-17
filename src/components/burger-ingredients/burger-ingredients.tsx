import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from './ingredients-group/ingredients-group'; 

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState<string | undefined>('bun');
  const groupsRef = useRef<HTMLLIElement[]>([]);

  const refCallback = useCallback((element: HTMLLIElement) => {
    if (element) {
      groupsRef.current.push(element);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target instanceof HTMLElement) {
            setCurrentTab(entry.target.dataset.type);
          }
        }
      });
    });
    groupsRef.current.forEach((group) => {
      observer.observe(group);
    });
  }, [])

  return (
    <section className={ `${styles.section} mr-10` }>
      <h1 className={ `${styles.title} mt-10 text text_type_main-large` }>Соберите бургер</h1>
      <div className={ `${styles.tabs} mt-5` }>
        <Tab value="bun" active={currentTab === 'bun'} onClick={() => {}}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === 'sauce'} onClick={() => {}}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={() => {}}>
          Начинки
        </Tab>
      </div>
      <ul className={ styles.ingredientsList }>
        <li className={ `${styles.group} mt-10` } ref={refCallback} data-type="bun">
          <IngredientsGroup name="Булки" type="bun"/>
        </li>
        <li className='mt-10' ref={refCallback} data-type="sauce">
          <IngredientsGroup name="Соусы" type="sauce"/>
        </li>
        <li className='mt-10' ref={refCallback} data-type="main">
          <IngredientsGroup name="Начинки" type="main"/>
        </li>
      </ul>
    </section>
  );
};

export default BurgerIngredients;
