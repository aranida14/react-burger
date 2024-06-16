import { useMemo, useState } from 'react';
import styles from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder, hideOrder } from '../../services/order-slice';
import { addIngredient, clearConstructor } from '../../services/burger-constructor-slice';
import { useDrop } from 'react-dnd';
import ConstructorElementContainer from './constructor-element-container';
import PlaceholderElement from './placeholder-element';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/loader';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { user } = useSelector((state) => state.user);
  const { orderId, isLoading, error } = useSelector((state) => state.order);

  const [showOrder, setShowOrder] = useState(false);

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

  const onDropHandler = (ingredient) => {
    dispatch(addIngredient({ ...ingredient, uuid: uuidv4() }));
  };

  const totalPrice = useMemo(() => {
    let sum = ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
    if (bun) {
      sum += bun.price * 2;
    }
    return sum;
  }, [ingredients, bun]);

  const onClick = () => {
    if (bun && ingredients.length) {
      if (!user) {
        navigate('/login');
      } else {
        const orderData = [
          bun._id,
          ...ingredients.map(({ _id }) => _id),
          bun._id,
        ];
        setShowOrder(true);
        dispatch(createOrder(orderData));
      }
    }
  }
  const handleDetailsClose = () => {
    if (!isLoading) {
      setShowOrder(false);
      dispatch(hideOrder());
      if (orderId) {
        dispatch(clearConstructor());
      }
    }
  }

  const loaderContainer = (
    <div className={`${styles.loaderContainer}`}>
      <div className={ `text text_type_main-large`}>Оформляем заказ...</div>
      <div className={`mt-20 mb-20`}>
        <Loader />
      </div>
    </div>
  );

  const errorContainer = (
    <div className='m-10'>
      <p className={`pt-4 pb-4 text text_type_main-default`}>При оформлении заказа возникла ошибка {error}</p>
    </div>
  );
  const orderModalContent =  isLoading ? loaderContainer
    : error ? errorContainer
    : <OrderDetails />;

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

        <Button
          htmlType="button"
          disabled={!bun || !ingredients.length}
          type="primary"
          size="large"
          onClick={onClick}
        >
          Оформить заказ
        </Button>

        {showOrder && (
          <Modal onClose={handleDetailsClose}>
            {orderModalContent}
          </Modal>
        )}
      </div>
    </section>
  );
}


export default BurgerConstructor;
