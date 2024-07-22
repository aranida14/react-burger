import Loader from '../components/loader/loader';
import OrderCardList from '../components/order-card-list/order-card-list';
import styles from './order-feed.module.css';
import { useDispatch, useSelector } from '../services/hooks';
import { TOrderCard, WebSocketStatus } from '../utils/types';
import { wsConnect, wsDisconnect } from '../services/order-feed-actions';
import { MAX_ORDERS_STATS, ORDER_FEED_URL } from '../utils/constants';
import { useEffect, useMemo } from 'react';

export const OrderFeedPage = () => {
  const { orders, total, totalToday, status } = useSelector((state) => state.orderFeed);
  // const ingredients = useSelector((state) => state.ingredients.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnect(ORDER_FEED_URL));
    return () => {
      dispatch(wsDisconnect());
    };
  }, []);

  const ordersReady = useMemo<TOrderCard[]>(
    () => orders.filter(({ status }) => status === 'done')
      .slice(0, MAX_ORDERS_STATS),
    [orders]
  );
  const ordersInProcess = useMemo<TOrderCard[]>(
    () => orders.filter(({ status }) => status === 'pending')
      .slice(0, MAX_ORDERS_STATS),
    [orders]
  );

  if (status === WebSocketStatus.CONNECTING) {
    return <Loader />;
  }
  return (
      <main className={styles.mainContainer}>
        <section className={`${styles.orderFeed} mr-15`}>
          <h2 className="text text_type_main-large pt-10 pb-5 pl-1">Лента заказов</h2>
          {/* <h2>Connection status: {status}</h2> */}
          <OrderCardList orders={orders} />
        </section>
        <section className={`${styles.ordersStats} mt-25`}>
          <div className={styles.ordersStatuses}>
            <div className={`${styles.statusesColumn}`}>
              <h2 className="text text_type_main-medium pb-6">Готовы:</h2>
              <ul className={`${styles.numbersList} ${styles.ready}`}>
                {ordersReady.map(({ number }) => (
                  <li key={number} className={`text text_type_digits-default mr-2`}>{number}</li>
                ))}
              </ul>
            </div>
            <div className={`${styles.statusesColumn}`}>
              <h2 className="text text_type_main-medium pb-6">В работе:</h2>
              <ul className={`${styles.numbersList}`}>
                {ordersInProcess.map(({ number }) => (
                  <li key={number} className="text text_type_digits-default">{number}</li>
                ))}
              </ul>
            </div>
          </div>
          <h2 className={`text text_type_main-medium mt-15`}>Выполнено за все время</h2>
          <div className={`${styles.totalAmount} text text_type_digits-large`}>{total}</div>
          <h2 className={`text text_type_main-medium mt-15`}>Выполнено за сегодня</h2>
          <div className={`${styles.totalAmount} text text_type_digits-large`}>{totalToday}</div>
        </section>
      </main>
  );
}
