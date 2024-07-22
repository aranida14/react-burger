import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "ORDER_FEED_ACTION">("ORDER_FEED_ACTION");
export const wsDisconnect = createAction("ORDER_FEED_DISCONNECT");
