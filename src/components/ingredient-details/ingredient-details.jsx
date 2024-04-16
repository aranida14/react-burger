import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
  const data = useSelector((store) => store.currentIngredient.data);
  
  return (
    <div className={styles.modalContent}>
      <img src={data.image_large} alt={data.name} className='ml-4 mr-4 mb-4'/>
      <div className={ `${styles.ingredientTitle} text text_type_main-medium mb-8` }>{data.name}</div>
      <div className={ `${styles.nutritionalValue} text text_type_main-default text_color_inactive mb-15` }>
        <div className={styles.nutritonItem}>
          <span>Калории, ккал</span>
          <span>{data.calories}</span>
        </div>
        <div className={styles.nutritonItem}>
          <span>Белки, г</span>
          <span>{data.proteins}</span>
        </div>
        <div className={styles.nutritonItem}>
          <span>Жиры, г</span>
          <span>{data.fat}</span>
        </div>
        <div className={styles.nutritonItem}>
          <span>Углеводы, г</span>
          <span>{data.carbohydrates}</span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;