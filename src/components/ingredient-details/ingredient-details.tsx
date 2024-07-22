import { useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import { useSelector } from '../../services/hooks/hooks';
import Loader from '../loader/loader';
import { TIngredient } from '../../utils/types';

const IngredientDetails = () => {
  const { data, isLoading, error } = useSelector((state) => state.ingredients);
  const { ingredientId } = useParams();
  
  if (isLoading) {
    return <Loader />;
  }

  const ingredient = data && data.length ? data.find((item: TIngredient) => item._id === ingredientId) : null;

  return (ingredient ?
    <div className={`${styles.modalContent}`}>
      <div className={ `${styles.title} text text_type_main-large ml-10 mr-10 mb-4`}>Детали ингредиента</div>
      <img src={ingredient.image_large} alt={ingredient.name} className='ml-4 mr-4 mb-4'/>
      <div className={ `${styles.ingredientTitle} text text_type_main-medium mb-8` }>{ingredient.name}</div>
      <div className={ `${styles.nutritionalValue} text text_type_main-default text_color_inactive mb-15` }>
        <div className={styles.nutritonItem}>
          <span>Калории, ккал</span>
          <span>{ingredient.calories}</span>
        </div>
        <div className={styles.nutritonItem}>
          <span>Белки, г</span>
          <span>{ingredient.proteins}</span>
        </div>
        <div className={styles.nutritonItem}>
          <span>Жиры, г</span>
          <span>{ingredient.fat}</span>
        </div>
        <div className={styles.nutritonItem}>
          <span>Углеводы, г</span>
          <span>{ingredient.carbohydrates}</span>
        </div>
      </div>
    </div>
  : <div/>);
};

export default IngredientDetails;