import { createAction } from "@reduxjs/toolkit";

export const wsConnectProfile = createAction<string, "PROFILE_ORDERS_ACTION">("PROFILE_ORDERS_ACTION");
export const wsDisconnectProfile = createAction("PROFILE_ORDERS_DISCONNECT");

export type TProfileExternalActions = ReturnType<typeof wsConnectProfile> | ReturnType<typeof wsDisconnectProfile>;