import styles from './ingredients-group.module.css';
import { ingredientPropTypes } from '../../../utils/types';
import PropTypes from 'prop-types';
import IngredientCard from '../ingredient-card/ingredient-card';


const IngredientsGroup = (props) => {
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
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export default IngredientsGroup;