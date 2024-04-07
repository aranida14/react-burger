import PropTypes from 'prop-types';
import styles from './placeholder-element.module.css';

const PlaceholderElement = ({ type }) => {
  const [ placeHolderStyle, placeholderText ] =
    (type === 'top') ? [ styles.placeholderTop, 'Выберите булку' ]
    : (type === 'primary') ? [ styles.placeholderPrimary, 'Выберите начинку']
    : [styles.placeholderBottom, 'Выберите булку'];

  return (
    <div className={styles.ingredientContainer}>
      <div className={
        `${styles.placeholder} 
        ${placeHolderStyle}
        text text_type_main-default`
      }>{placeholderText}</div>
    </div>
  );
}

export default PlaceholderElement;

PlaceholderElement.propTypes = {
  type: PropTypes.string.isRequired,
}