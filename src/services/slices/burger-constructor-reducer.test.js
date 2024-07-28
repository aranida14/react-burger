import burgerConstructorReducer, { initialState } from "./burger-constructor-slice";

const bun = {
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
  "__v":0,
  "uuid":"65eb92d3-e49f-43ad-8d50-c4db4901889e",
};

const ingredient1 = {
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
  "__v":0,
  "uuid":"1433bbaa-4635-4846-a458-891bcab52a83",
};

const ingredient2 = {
  "_id":"60666c42cc7b410027a1a9b7",
  "name":"Соус Spicy-X",
  "type":"sauce",
  "proteins":30,
  "fat":20,
  "carbohydrates":40,
  "calories":30,
  "price":90,
  "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
  "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
  "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
  "__v":0,
  "uuid":"1073cbb8-dc76-45e1-bd84-aae6f138a86b",
};

describe("burger-constructor reducer", () => {
  it("initializes correctly", () => {
    const state = burgerConstructorReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("should add bun ingredient", () => {
    const action = { type: "burgerConstructor/addIngredient", payload: bun };
    const state = burgerConstructorReducer(initialState, action);

    expect(state).toEqual({ ...initialState, bun: bun });
  });

  it("should add main ingredient", () => {
    const action = { type: "burgerConstructor/addIngredient", payload: ingredient1 };
    const state = burgerConstructorReducer(initialState, action);

    expect(state).toEqual({ ...initialState, ingredients: [ingredient1] });
  });

  it("should delete ingredient", () => {
    const prevState = {...initialState, ingredients: [ingredient1, ingredient2] };
    const action = { type: "burgerConstructor/deleteIngredient", payload: ingredient1.uuid };
    const state = burgerConstructorReducer(prevState, action);

    expect(state).toEqual({ ...initialState, ingredients: [ingredient2] });
  });

  it("should move ingredient", () => {
    const prevState = {...initialState, bun, ingredients: [ingredient1, ingredient2] };
    const action = { type: "burgerConstructor/moveIngredient", payload: { fromIndex: 0, toIndex: 1 } };
    const state = burgerConstructorReducer(prevState, action);

    expect(state).toEqual({ ...initialState, bun, ingredients: [ingredient2, ingredient1] });
  });

  it("should clear constructor", () => {
    const prevState = {...initialState, bun, ingredients: [ingredient1, ingredient2] };
    const action = { type: "burgerConstructor/clearConstructor" };
    const state = burgerConstructorReducer(prevState, action);

    expect(state).toEqual({ ...initialState });
  });  
});