import OrderCardList from "../components/order-card-list/order-card-list";
import { useDispatch, useSelector } from "../services/hooks/hooks";
import { WebSocketStatus } from '../utils/types';
import { wsConnect, wsDisconnect } from '../services/actions/order-feed-actions';
import { ORDER_FEED_URL } from '../utils/constants';
import { useEffect } from 'react';
import Loader from "../components/loader/loader";

export const OrdersHistoryPage = () => {
  const { orders, status } = useSelector((state) => state.orderFeed);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnect(ORDER_FEED_URL));
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);
  
  if (status === WebSocketStatus.CONNECTING) {
    return <Loader />;
  }

  return <OrderCardList orders={orders} />;
};