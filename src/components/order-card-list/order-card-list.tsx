import OrderCard from "../order-card/order-card";
import styles from './order-card-list.module.css';
import { ordersData } from "../../utils/data";

const OrderCardList = () => {
  const orders = ordersData.orders;
  return (
    // <div className={styles.container}>
      <ul className={`${styles.container} pr-2`}>
      {
        orders.map((order) => (
          <li key={order._id} className="mb-4">
              <OrderCard order={order}/>
          </li>
        ))
      }
      </ul>
    // </div>
  );
};

export default OrderCardList;