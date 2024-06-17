import styles from './placeholder-element.module.css';

type TPlaceHolderProps = {
  type: string;
};

const PlaceholderElement = ({ type }: TPlaceHolderProps) => {
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
