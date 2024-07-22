import OrderCardList from "../components/order-card-list/order-card-list";
import { useDispatch, useSelector } from "../services/hooks/hooks";
import { WebSocketStatus } from '../utils/types';
import { wsConnectProfile, wsDisconnectProfile } from '../services/actions/profile-orders-actions';
import { ORDERS_BY_USER_URL } from '../utils/constants';
import { useEffect, useMemo } from 'react';
import Loader from "../components/loader/loader";

export const OrdersHistoryPage = () => {
  const { orders, status } = useSelector((state) => state.profileOrders);
  const sortedOrders = useMemo(() => orders ? [...orders].reverse() : [], [orders]);
  const dispatch = useDispatch();
  useEffect(() => {
    const wssUrl = new URL(ORDERS_BY_USER_URL);
    wssUrl.searchParams.set(
      "token",
      (localStorage.getItem('accessToken') ?? '').replace('Bearer ', '')
    );
    dispatch(wsConnectProfile(wssUrl.toString()));
    return () => {
      dispatch(wsDisconnectProfile());
    };
  }, [dispatch]);
  
  if (status === WebSocketStatus.CONNECTING) {
    return <Loader />;
  }

  if (!orders || !orders.length) {
    return null;
  }

  return (
    <>
      {/* <h2>Connection status: {status}</h2> */}
      <OrderCardList orders={sortedOrders} />
    </>
  );
};