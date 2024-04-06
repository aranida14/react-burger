import React from 'react';
import styles from './ingredients-group.module.css';
import PropTypes from 'prop-types';
import IngredientCard from '../ingredient-card/ingredient-card';
import { useSelector } from 'react-redux';

const IngredientsGroup = ({name, type}) => {
  const ingredients = useSelector((state) => state.ingredients.data);
  const groupedIngredients = React.useMemo(
    () => ingredients.filter((item) => item.type === type),
    [ingredients]
  );
  
  return (
    <li className={styles.group}>
      <h2 className={ `${styles.groupTitle } text text_type_main-medium mb-6` }>{name}</h2>
      <ul className={styles.groupList}>
        {
          groupedIngredients.map((ingredient) => ( 
            <IngredientCard key={ingredient._id} data={ingredient}/>
          ))
        } 
      </ul>
    </li>
  )
}

IngredientsGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredientsGroup;