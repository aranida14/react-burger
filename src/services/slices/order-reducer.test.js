import orderReducer, { initialState } from "./order-slice";

const orderCard = {
  "_id": "6697836d119d45001b4f9852",
  "ingredients": ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa0943", "643d69a5c3f7b9001cfa093d"],
  "status": "done",
  "name": "Space флюоресцентный люминесцентный бургер",
  "createdAt": "2024-07-17T08:40:13.254Z",
  "updatedAt": "2024-07-17T08:40:13.702Z",
  "number": 46210
};

describe("order reducer", () => {
  it("initializes correctly", () => {
    const state = orderReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("should create order request", () => {
    const action = { type: "order/createOrderRequest" };
    const state = orderReducer(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: true, error: null });
  });

  it("should create order success", () => {
    const orderId = '12345';
    const action = { type: "order/createOrderSuccess", payload: orderId };
    const state = orderReducer(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: false, orderId });
  });

  it("should create order failure", () => {
    const error = { message: 'error' };
    const action = { type: "order/createOrderFailure", payload: error };
    const state = orderReducer(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: false, error: error.message });
  });

  it("should hide order", () => {
    const action = { type: "order/hideOrder" };
    const state = orderReducer(initialState, action);

    expect(state).toEqual({ ...initialState, orderId: null });
  });


  it("should get order request", () => {
    const action = { type: "order/getOrderRequest" };
    const state = orderReducer(initialState, action);

    expect(state).toEqual({ ...initialState, currentOrder: null });
  });

  it("should get order success", () => {
    const action = { type: "order/getOrderSuccess", payload: orderCard };
    const state = orderReducer(initialState, action);

    expect(state).toEqual({ ...initialState, currentOrder: orderCard });
  });

  it("should get order failure", () => {
    const action = { type: "order/getOrderFailure" };
    const state = orderReducer(initialState, action);

    expect(state).toEqual({ ...initialState, currentOrder: null });
  });
});