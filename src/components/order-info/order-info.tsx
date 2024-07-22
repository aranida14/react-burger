import { useLocation, useParams } from 'react-router-dom';
// import { ordersData } from '../../utils/data';
import { useSelector } from '../../services/hooks/hooks';
import { useMemo } from 'react';
import { TCountedIngredient } from '../../utils/types';
import { getGroupedIngredients, getIngredientsByIds, getLocalizedOrderStatus, getOrderPrice } from "../../utils/utils";
import Loader from '../loader/loader';
import styles from './order-info.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderInfo = (): React.JSX.Element => {
  const location = useLocation();
  const background = location.state && location.state.background;

  const { orderId }  = useParams();
  const { orders } = useSelector((state) => state.orderFeed); //TODO if profile location, select profile orders
  const order = orders.find((orderItem) => orderItem._id === orderId);
  // const { data: ingredients, isLoading } = useSelector((state) => state.ingredients);
  const ingredients = useSelector((state) => state.ingredients.data);

  const orderIngredients = useMemo<TCountedIngredient[] | null>(
    () => order ? getGroupedIngredients(getIngredientsByIds(order.ingredients, ingredients)) : null,
    [ingredients, order, getGroupedIngredients, getIngredientsByIds]
  );

  const orderPrice = useMemo<number>(
    () => orderIngredients ? getOrderPrice(orderIngredients) : 0, [orderIngredients]);

  const status = order ? getLocalizedOrderStatus(order.status) : '';

  if (!order) {
    return <div/>;
  }
  return (
    <div className={`${styles.container} pt-2`}>
      <div
        className={`text text_type_digits-default ${styles.orderNumber} ${!background ? styles.center : ''}`}
        >{`#${order.number}`}</div>
      <div className={`text text_type_main-medium mt-10 ${styles.orderName}`}>{order.name}</div>
      <div className={`mt-3 ${order.status === 'done' ? styles.ready : ''} text text_type_main-default`}>{status}</div>
      <div className="text text_type_main-medium mt-15 mb-6">Состав:</div> 
      <ul className={styles.ingredients}>
        {orderIngredients?.map((ingredient) => {
          return (
            <li key={ingredient._id} className={styles.ingredient}>
              <div className={styles.imageContainer}>
                <div className={styles.imageInnerContainer}>
                  <img src={ingredient.image_mobile} alt={ingredient.name} className={styles.image}/>
                </div>
              </div>
              <div className="text text_type_main-default ml-4 mr-4">{ingredient.name}</div>
              <div className={ `${styles.priceContainer} ${styles.right} mr-6`}>
                <span className={ `text text_type_digits-default ${styles.price}`}>
                  {`${ingredient.count} x ${ingredient.price}`}
                </span>
                <CurrencyIcon type="primary" />
            </div>
            </li>)
        })}
      </ul> 
      <div className={`${styles.bottom} mt-10 mb-10`}>
        <FormattedDate date={new Date(order.createdAt)} className="text text_type_main-default text_color_inactive" />
        <div className={ `${styles.priceContainer}`}>
            <span className={ `text text_type_digits-default ${styles.price}`}>{orderPrice}</span>
            <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>);
}

export default OrderInfo;