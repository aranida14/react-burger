import profileOrdersReducer, { initialState } from "./profile-orders-slice";
import { WebSocketStatus } from "../../utils/types";

const ordersData = {
  "success": true,
  "orders": [{
      "_id": "6697ceff119d45001b4f9961",
      "ingredients": ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa0945", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093f", "643d69a5c3f7b9001cfa0947", "643d69a5c3f7b9001cfa093d"],
      "status": "done",
      "name": "Флюоресцентный антарианский фалленианский бессмертный люминесцентный бургер",
      "createdAt": "2024-07-17T14:02:39.888Z",
      "updatedAt": "2024-07-17T14:02:40.295Z",
      "number": 46259
  }],
  "total": 45885,
  "totalToday": 296,
};

describe("profile orders reducer", () => {
  it("initializes correctly", () => {
    const state = profileOrdersReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("should connect ws", () => {
    const action = { type: "profileOrders/wsConnectingProfile" };
    const state = profileOrdersReducer(initialState, action);

    expect(state).toEqual({ ...initialState, status: WebSocketStatus.CONNECTING });
  });

  it("should open ws", () => {
    const action = { type: "profileOrders/wsOpenProfile" };
    const state = profileOrdersReducer(initialState, action);

    expect(state).toEqual({ ...initialState, status: WebSocketStatus.ONLINE, connectionError: null });
  });

  it("should close ws", () => {
    const action = { type: "profileOrders/wsCloseProfile" };
    const state = profileOrdersReducer(initialState, action);

    expect(state).toEqual({ ...initialState, status: WebSocketStatus.OFFLINE });
  });

  it("should set ws error", () => {
    const action = { type: "profileOrders/wsErrorProfile", payload: 'error' };
    const state = profileOrdersReducer(initialState, action);

    expect(state).toEqual({ ...initialState, connectionError: 'error' });
  });

  it("should process ws message", () => {
    const action = { type: "profileOrders/wsMessageProfile", payload: ordersData };
    const state = profileOrdersReducer(initialState, action);

    expect(state).toEqual({ ...initialState, orders: ordersData.orders });
  });

});