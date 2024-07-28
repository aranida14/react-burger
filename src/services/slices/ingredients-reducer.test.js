import ingredientsReducer, { initialState } from "./ingredients-slice";

const data = [
  {
     "_id":"60666c42cc7b410027a1a9b1",
     "name":"Краторная булка N-200i",
     "type":"bun",
     "proteins":80,
     "fat":24,
     "carbohydrates":53,
     "calories":420,
     "price":1255,
     "image":"https://code.s3.yandex.net/react/code/bun-02.png",
     "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
     "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
     "__v":0
  },
  {
     "_id":"60666c42cc7b410027a1a9b5",
     "name":"Говяжий метеорит (отбивная)",
     "type":"main",
     "proteins":800,
     "fat":800,
     "carbohydrates":300,
     "calories":2674,
     "price":3000,
     "image":"https://code.s3.yandex.net/react/code/meat-04.png",
     "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
     "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
     "__v":0
  },
  {
     "_id":"60666c42cc7b410027a1a9b6",
     "name":"Биокотлета из марсианской Магнолии",
     "type":"main",
     "proteins":420,
     "fat":142,
     "carbohydrates":242,
     "calories":4242,
     "price":424,
     "image":"https://code.s3.yandex.net/react/code/meat-01.png",
     "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
     "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
     "__v":0
  },
];

describe("ingredients reducer", () => {
  it("initializes correctly", () => {
    const state = ingredientsReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("should fetch ingredients request", () => {
    const action = { type: "ingredients/fetchIngredientsRequest" };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: true, error: null });
  });

  it("should fetch ingredients success", () => {
    const action = { type: "ingredients/fetchIngredientsSuccess", payload: data };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: false, data });
  });

  it("should fetch ingredients failure", () => {
    const action = { type: "ingredients/fetchIngredientsFailure", payload: { message: 'error' } };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: false, error: 'error' });
  });
});