import { combineReducers, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import ingredientsReducer, { TIngredientsActions } from './slices/ingredients-slice';
import burgerConstructorReducer, { TBurgerConstructorActions } from './slices/burger-constructor-slice';
import orderReducer, { TOrderActions } from './slices/order-slice';
import userReducer, { TUserActions } from './slices/user-slice';
import orderFeedReducer, {
  TFeedInternalActions,
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen
} from './slices/order-feed-slice';
import { socketMiddlware } from './middlware/socket-middlware';
import { TFeedExternalActions, wsConnect, wsDisconnect } from './actions/order-feed-actions';
import profileOrdersSlice, {
  TProfileOrdersActions,
  wsCloseProfile,
  wsConnectingProfile,
  wsErrorProfile,
  wsMessageProfile,
  wsOpenProfile,
} from './slices/profile-orders-slice';
import { TProfileExternalActions, wsConnectProfile, wsDisconnectProfile } from './actions/profile-orders-actions';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  user: userReducer,
  orderFeed: orderFeedReducer,
  profileOrders: profileOrdersSlice,
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

const profileOrdersMiddlware = socketMiddlware({
  connect: wsConnectProfile,
  disconnect: wsDisconnectProfile,
  onConnecting: wsConnectingProfile,
  onOpen: wsOpenProfile,
  onError: wsErrorProfile,
  onClose: wsCloseProfile,
  onMessage: wsMessageProfile,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddlware) => {
    return getDefaultMiddlware().concat(orderFeedMiddlware, profileOrdersMiddlware);
  }
});

type TApplicationActions = 
  | TFeedExternalActions
  | TFeedInternalActions
  | TOrderActions
  | TUserActions
  | TIngredientsActions
  | TBurgerConstructorActions
  | TProfileExternalActions
  | TProfileOrdersActions;

export type RootState = ReturnType<typeof rootReducer>; 
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;