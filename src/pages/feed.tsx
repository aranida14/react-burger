// import styles from './home.module.css';
import Loader from '../components/loader/loader';
import OrderCardList from '../components/order-card-list/order-card-list';
// import OrderCard from '../components/order-card/order-card';
import styles from './feed.module.css';
import { ordersData } from '../utils/data';

export const FeedPage = () => {
  // const { data, isLoading, error } = useSelector((state) => state.ingredients);

  // if (isLoading) {
  //   return <Loader />;
  // }

  const ordersReady = ['046210', '046211', '046212', '046213', '046214', '046215', '046216', '046217'];
  const ordersInProcess = ['046259', '046258', '046257'];


  return (
      <main className={styles.mainContainer}>
        <section className={`${styles.orderFeed} mr-15`}>
          <h2 className="text text_type_main-large pt-10 pb-5 pl-1">Лента заказов</h2>
          {/* <Loader /> */}
          <OrderCardList />
        </section>
        <section className={`${styles.ordersStats} mt-25`}>
          <div className={styles.ordersStatuses}>
            <div className={`${styles.statusesColumn}`}>
              <h2 className="text text_type_main-medium pb-6">Готовы:</h2>
              <ul className={`${styles.numbersList} ${styles.ready}`}>
                {ordersReady.map((orderNumber) => (
                  <li key={orderNumber} className={`text text_type_digits-default mr-2`}>{orderNumber}</li>
                ))}
              </ul>
            </div>
            <div className={`${styles.statusesColumn}`}>
              <h2 className="text text_type_main-medium pb-6">В работе:</h2>
              <ul className={`${styles.numbersList}`}>
                {ordersInProcess.map((orderNumber) => (
                  <li key={orderNumber} className="text text_type_digits-default">{orderNumber}</li>
                ))}
              </ul>
            </div>
          </div>
          <h2 className={`text text_type_main-medium mt-15`}>Выполнено за все время</h2>
          <div className={`${styles.totalAmount} text text_type_digits-large`}>{ordersData.total}</div>
          <h2 className={`text text_type_main-medium mt-15`}>Выполнено за сегодня</h2>
          <div className={`${styles.totalAmount} text text_type_digits-large`}>{ordersData.totalToday}</div>
        </section>
      </main>
      
  );
}
