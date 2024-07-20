import OrderCard from "../order-card/order-card";
import styles from './order-card-list.module.css';
import { ordersData } from "../../utils/data";
import { Link, useLocation } from "react-router-dom";

const OrderCardList = () => {
  const location = useLocation();
  const orders = ordersData.orders;
  return (
      <ul className={`${styles.container} pr-2`}>
      {
        orders.map((order) => (
          <li key={order._id} className="mb-4">
            <Link
              to={location.pathname === '/feed' ? `/feed/${order._id}` : `/profile/orders/${order._id}`}
              // state={{ background: location }}
              className={styles.link}
            >
              <OrderCard order={order}/>
            </Link>              
          </li>
        ))
      }
      </ul>
  );
};

export default OrderCardList;