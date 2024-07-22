import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrdersData, WebSocketStatus, TOrderCard} from "../utils/types";

export type TOrderFeedState = {
  status: WebSocketStatus;
  orders: TOrderCard[];
  total: number;
  totalToday: number;
  connectionError: string | null;
};

const initialState: TOrderFeedState = {
  status: WebSocketStatus.OFFLINE,
  orders: [],
  total: 0,
  totalToday: 0,
  connectionError: null,
}

export const orderFeedSlice = createSlice({
  name: 'orderFeed',
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
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  },
  // selectors: {
  //   getOrders: (state) => state.orders,
  //   getTotal: (state) => state.total,
  //   getTotalToday: (state) => state.totalToday,
  //   getWebSocketStatus: (state) => state.status,
  // }
});

export const {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage
} = orderFeedSlice.actions;

// export const {
//   getOrders,
//   getTotal,
//   getTotalToday,
//   getWebSocketStatus
// } = orderFeedSlice.selectors;

export default orderFeedSlice.reducer;