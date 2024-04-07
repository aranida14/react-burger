import { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder, hideOrder } from '../../services/order-slice';
import { addIngredient, clearConstructor } from '../../services/burger-constructor-slice';

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { data: allIngredients } = useSelector((state) => state.ingredients);//TODO remove

  const onConstructorClick = () => {//TODO remove, used for debug only
    if (allIngredients.length) {
      dispatch(addIngredient(allIngredients[0]));
      dispatch(addIngredient(allIngredients[1]));
      dispatch(addIngredient(allIngredients[2]));
      dispatch(addIngredient(allIngredients[2]));
      dispatch(addIngredient(allIngredients[2]));
    }
  }

  const orderId = useSelector((state) => state.order.orderId);
  const totalPrice = useMemo(() => {
    let sum = ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
    if (bun) {
      sum += bun.price * 2;
    }
    return sum;
  }, [ingredients, bun]);

  const onClick = () => {
    if (bun && ingredients.length) {
      const orderData = [
        bun._id,
        ...ingredients.map(({ _id }) => _id),
        bun._id,
      ];
      dispatch(createOrder(orderData));
      dispatch(clearConstructor());
    }
  }
  const onClose = () => {
    dispatch(hideOrder());
  }

  return (
    <section className={ `${styles.section} pt-25 pl-4` }>
      {/* TODO remove onClick!!! just for debugging */}
      <ul className={styles.elementsContainer} onClick={onConstructorClick}>
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
          <span className={ `text text_type_digits-medium mr-3 ${styles.sum}`}>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" type="primary" size="large" onClick={onClick}>Оформить заказ</Button>
        <Modal isOpen={!!orderId} onClose={onClose} >
          <OrderDetails />
        </Modal>
      </div>
    </section>
  );
}

export default BurgerConstructor;
