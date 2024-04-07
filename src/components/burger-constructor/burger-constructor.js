import { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder, hideOrder } from '../../services/order-slice';
import { clearConstructor } from '../../services/burger-constructor-slice';
import { useDrop } from 'react-dnd';
import ConstructorElementContainer from './constructor-element-container';
import PlaceholderElement from './placeholder-element';

const BurgerConstructor = ({ onDropHandler }) => {
  const dispatch = useDispatch();

  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

  const [{ dragItem, canDrop }, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      dragItem: monitor.getItem(),
    }),
  });

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
  const handleDetailsClose = () => {
    dispatch(hideOrder());
  }

  return (
    <section ref={dropRef} className={ `${styles.section} pt-25 pl-4` }>
      <ul className={styles.elementsContainer}>
        <li className={ `${styles.constructorElement}`}>
          {
          bun ? <div className={styles.ingredientContainer}><ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image}
                /></div>
          : <PlaceholderElement type='top' />
          }
        </li>

        {
          (ingredients && ingredients.length) ?
          ingredients.map((ingredient, index) => (
            <li className={styles.constructorElement} key={ingredient.uuid}>
              <ConstructorElementContainer ingredient={ingredient} index={index} />
            </li>
          ))
          : (<li className={styles.constructorElement}>
               <PlaceholderElement type='primary' />
            </li>)
        }

        <li className={ `${styles.constructorElement}` }>
          {
          bun ? <div className={styles.ingredientContainer}><ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun.name} (низ)`}
                  price={bun.price}
                  thumbnail={bun.image}
                /></div>
          : <PlaceholderElement type='bottom' />
          }
        </li>
      </ul>

      <div className={ `${styles.orderContainer} mt-10`}>
        <div className={ `${styles.sumContainer} mr-10`}>
          <span className={ `text text_type_digits-medium mr-3 ${styles.sum}`}>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" disabled={!bun || !ingredients.length} type="primary" size="large" onClick={onClick}>Оформить заказ</Button>
        <Modal isOpen={!!orderId} onClose={handleDetailsClose} >
          <OrderDetails />
        </Modal>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  onDropHandler: PropTypes.func.isRequired,
};

export default BurgerConstructor;
