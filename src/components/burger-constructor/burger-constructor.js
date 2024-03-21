import styles from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data';

function BurgerConstructor(props) {//TODO брать элементы из data или сразу сделать через props
  const img = 'https://code.s3.yandex.net/react/code/bun-02-mobile.png';
  return (
    <section className={ `${styles.section} pt-25 pl-4` }>
      <ul className={styles.elementsContainer}>
        <li className={ `${styles.constructorElement}` }>
          {/* <DragIcon type="primary" /> */}
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${data[0].name} (верх)`}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </li>
        
        <li className={styles.constructorElement}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={data[5].name}
            price={data[5].price}
            thumbnail={data[5].image}
          />
        </li>
        
        <li className={styles.constructorElement}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={data[4].name}
            price={data[4].price}
            thumbnail={data[4].image}
          />
        </li>
        
        <li className={styles.constructorElement}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={data[7].name}
            price={data[7].price}
            thumbnail={data[7].image}
          />
        </li>
        
        <li className={styles.constructorElement}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={data[8].name}
            price={data[8].price}
            thumbnail={data[8].image}
          />
        </li>
        
        <li className={styles.constructorElement}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={data[8].name}
            price={data[8].price}
            thumbnail={data[8].image}
          />
        </li>

        <li className={ `${styles.constructorElement}` }>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${data[0].name} (низ)`}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </li>
      </ul>

      <div className={ `${styles.orderContainer} mt-10`}>
        <div className={ `${styles.sumContainer} mr-10`}>
          <span className={ `text text_type_digits-medium mr-3 ${styles.sum}`}>610</span>
          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
