import { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder, hideOrder } from '../../services/order-slice';
import { addIngredient, clearConstructor, deleteIngredient } from '../../services/burger-constructor-slice';
import { useDrop } from 'react-dnd';

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


  const handleIngredientDelete = (e, id) => {
    dispatch(deleteIngredient(id));
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
  const handleDetailsClose = () => {
    dispatch(hideOrder());
  }

  return (
    <section ref={dropRef} className={ `${styles.section} pt-25 pl-4` }>
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
          : <div className={
            `${styles.placeholder} 
            ${styles.placeholderTop}
            text text_type_main-default`
        }>Выберите булку</div>
          }
        </li>

        {
          (ingredients && ingredients.length) ?
          ingredients.map((ingredient) => (
            <li className={styles.constructorElement} key={ingredient.uuid}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={(e) => handleIngredientDelete(e, ingredient.uuid)}
              />
            </li>
          ))
          : (<li className={styles.constructorElement}>
              <div className={
                  `${styles.placeholder} 
                  ${styles.placeholderPrimary}
                  text text_type_main-default`
                }>Выберите начинку</div>
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
