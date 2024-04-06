import React from 'react';
import styles from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector } from 'react-redux';

const BurgerConstructor = () => {
  const [showModal, setShowModal] = React.useState(false);
  const orderId = '034536';

  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

  return (
    <section className={ `${styles.section} pt-25 pl-4` }>
      <ul className={styles.elementsContainer}>
        <li className={ `${styles.constructorElement}`}>
          {
          bun ? <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image}
                />
          : <div className={ `${styles.placeholder} ${styles.placeholderTop} text text_type_main-default` }>Выберите булку</div>
          }
        </li>

        {
          (ingredients && ingredients.length) ?
          ingredients.map((ingredient) => (
            <li className={styles.constructorElement} key={ingredient._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))
          : (<li className={styles.constructorElement}>
              <div className={ `${styles.placeholder} ${styles.placeholderPrimary} text text_type_main-default` }>Выберите начинку</div>
            </li>)
        }

        <li className={ `${styles.constructorElement}` }>
          {
          bun ? <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun.name} (низ)`}
                  price={bun.price}
                  thumbnail={bun.image}
                />
          : <div className={ `${styles.placeholder} ${styles.placeholderBottom} text text_type_main-default` }>Выберите булку</div>
          }
        </li>
      </ul>

      <div className={ `${styles.orderContainer} mt-10`}>
        <div className={ `${styles.sumContainer} mr-10`}>
          <span className={ `text text_type_digits-medium mr-3 ${styles.sum}`}>610</span>
          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" type="primary" size="large" onClick={() => setShowModal(true)}>Оформить заказ</Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} >
          <OrderDetails id={orderId} />
        </Modal>
      </div>
    </section>
  );
}

export default BurgerConstructor;
