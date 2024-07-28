import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrdersData, WebSocketStatus, TOrderCard} from "../../utils/types";

export type TProfileOrdersState = {
  status: WebSocketStatus;
  orders: TOrderCard[];
  connectionError: string | null;
};

export const initialState: TProfileOrdersState = {
  status: WebSocketStatus.OFFLINE,
  orders: [],
  connectionError: null,
}

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {
    wsConnectingProfile: (state) => {
      state.status = WebSocketStatus.CONNECTING;
    },
    wsOpenProfile: (state) => {
      state.status = WebSocketStatus.ONLINE;
      state.connectionError = null;
    },
    wsCloseProfile: (state) => {
      state.status = WebSocketStatus.OFFLINE;
    },
    wsErrorProfile: (state, action: PayloadAction<string>) => {
      state.connectionError = action.payload;
    },
    wsMessageProfile: (state, action: PayloadAction<TOrdersData>) => {
      state.orders = action.payload.orders;
    }
  },
});

export const {
  wsConnectingProfile,
  wsOpenProfile,
  wsCloseProfile,
  wsErrorProfile,
  wsMessageProfile,
} = profileOrdersSlice.actions;


export default profileOrdersSlice.reducer;

type TActionCreators = typeof profileOrdersSlice.actions;

export type TProfileOrdersActions = ReturnType<TActionCreators[keyof TActionCreators]>;