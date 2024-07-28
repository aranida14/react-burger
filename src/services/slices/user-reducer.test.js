import userReducer, { initialState } from "./user-slice";

const user = {
  name: 'TestUser',
  email: 'testuser@test.com',
};

const error = { message: 'error message' };

describe("user reducer", () => {
  it("initializes correctly", () => {
    const state = userReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("should set auth checked", () => {
    const action = { type: "user/setAuthChecked", payload: true };
    const state = userReducer(initialState, action);

    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });

  it("should get user failure", () => {
    const action = { type: "user/getUserFailure", payload: error };
    const state = userReducer(initialState, action);

    expect(state).toEqual({ ...initialState, user: null, getUserError: error.message });
  });

  it("should get user success", () => {
    const action = { type: "user/getUserSuccess", payload: { user } };
    const state = userReducer(initialState, action);

    expect(state).toEqual({ ...initialState, getUserError: null, user });
  });

  it("should update user failure", () => {
    const action = { type: "user/updateUserFailure", payload: error };
    const state = userReducer(initialState, action);

    expect(state).toEqual({ ...initialState, updateUserError: error.message });
  });

  it("should reset user update error", () => {
    const action = { type: "user/updateUserResetError" };
    const state = userReducer(initialState, action);

    expect(state).toEqual({ ...initialState, updateUserError: null });
  });

  it("should update user success", () => {
    const action = { type: "user/updateUserSuccess", payload: { user } };
    const state = userReducer(initialState, action);

    expect(state).toEqual({ ...initialState, updateUserError: null, user });
  });

  it("should register user failure", () => {
    const action = { type: "user/registerUserFailure", payload: error };
    const state = userReducer(initialState, action);

    expect(state).toEqual({ ...initialState, registerUserError: error.message });
  });

  it("should register user success", () => {
    const action = { type: "user/registerUserSuccess", payload: { user } };
    const state = userReducer(initialState, action);

    expect(state).toEqual({ ...initialState, registerUserError: null, user });
  });

  it("should login failure", () => {
    const action = { type: "user/loginFailure", payload: error };
    const state = userReducer(initialState, action);

    expect(state).toEqual({ ...initialState, loginError: error.message });
  });

  it("should login success", () => {
    const action = { type: "user/loginSuccess", payload: { user } };
    const state = userReducer(initialState, action);

    expect(state).toEqual({ ...initialState, loginError: null, user });
  });

  it("should logout failure", () => {
    const action = { type: "user/logoutFailure", payload: error };
    const state = userReducer(initialState, action);

    expect(state).toEqual({ ...initialState, logoutError: error.message });
  });

  it("should logout success", () => {
    const action = { type: "user/logoutSuccess" };
    const state = userReducer(initialState, action);

    expect(state).toEqual({ ...initialState, logoutError: null, user: null });
  });
});