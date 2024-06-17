import React from 'react';
import styles from './ingredients-group.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import { useSelector } from 'react-redux';
import { TIngredient } from '../../../utils/types';

type TIngredientGroupProps = {
  name: string;
  type: string;
};

const IngredientsGroup = ({name, type}: TIngredientGroupProps) => {
  // @ts-ignore
  const ingredients = useSelector((state) => state.ingredients.data);
  const groupedIngredients = React.useMemo<TIngredient[]>(
    () => ingredients.filter((item: TIngredient) => item.type === type),
    [ingredients]
  );
  
  return (
    <>
      <h2 className={ `${styles.groupTitle } text text_type_main-medium mb-6` }>{name}</h2>
      <ul className={styles.groupList}>
        {
          groupedIngredients.map((ingredient: TIngredient) => ( 
            <li key={ingredient._id}>
              <IngredientCard data={ingredient}/>
            </li>
          ))
        } 
      </ul>
    </>
  )
}

export default IngredientsGroup;