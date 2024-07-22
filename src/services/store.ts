import { combineReducers, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import ingredientsReducer, { TIngredientsActions } from './slices/ingredients-slice';
import burgerConstructorReducer, { TBurgerConstructorActions } from './slices/burger-constructor-slice';
import orderReducer, { TOrderActions } from './slices/order-slice';
import userReducer, { TUserActions } from './slices/user-slice';
import orderFeedReducer, { TFeedInternalActions, wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './slices/order-feed-slice';
import { socketMiddlware } from './middlware/socket-middlware';
import { TFeedExternalActions, wsConnect, wsDisconnect } from './actions/order-feed-actions';
import { TProfileOrdersActions } from './slices/profile-orders-slice';

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

type TApplicationActions = 
  | TFeedExternalActions
  | TFeedInternalActions
  | TOrderActions
  | TUserActions
  | TIngredientsActions
  | TBurgerConstructorActions
  | TProfileOrdersActions;

export type RootState = ReturnType<typeof rootReducer>; 
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;