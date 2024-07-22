import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrdersData, WebSocketStatus, TOrderCard} from "../../utils/types";

export type TProfileOrdersState = {
  status: WebSocketStatus;
  orders: TOrderCard[];
  connectionError: string | null;
};

const initialState: TProfileOrdersState = {
  status: WebSocketStatus.OFFLINE,
  orders: [],
  connectionError: null,
}

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.status = WebSocketStatus.CONNECTING;
    },
    wsOpen: (state) => {
      state.status = WebSocketStatus.ONLINE;
      state.connectionError = null;
    },
    wsClose: (state) => {
      state.status = WebSocketStatus.OFFLINE;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsMessage: (state, action: PayloadAction<TOrdersData>) => {
      state.orders = action.payload.orders;
    }
  },
});

export const {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage
} = profileOrdersSlice.actions;


export default profileOrdersSlice.reducer;

type TActionCreators = typeof profileOrdersSlice.actions;

export type TProfileOrdersActions = ReturnType<TActionCreators[keyof TActionCreators]>;