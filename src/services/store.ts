import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ingredientsReducer from './ingredients-slice';
import burgerConstructorReducer from './burger-constructor-slice';
import orderReducer from './order-slice';
import userReducer from './user-slice';
import orderFeedReducer, { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './order-feed-slice';
import { socketMiddlware } from './socket-middlware';
import { wsConnect, wsDisconnect } from './order-feed-actions';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  user: userReducer,
  orderFeed: orderFeedReducer,
});

const orderFeedMiddlware = socketMiddlware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onConnecting: wsConnecting,
  onOpen: wsOpen,
  onError: wsError,
  onClose: wsClose,
  onMessage: wsMessage,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddlware) => {
    return getDefaultMiddlware().concat(orderFeedMiddlware);
  }
});

export type RootState = ReturnType<typeof rootReducer>; 
export type AppDispatch = typeof store.dispatch;