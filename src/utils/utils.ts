import { TIngredient, TCountedIngredient, TOrderStatus } from "./types";

export const getIngredientsByIds = (ingredientIds: string[], ingredients: TIngredient[] ): TIngredient[] => (
  ingredientIds.map((id: string) => ingredients
      .find((ingredient) => ingredient._id === id))
      .filter((item) => item !== undefined) as TIngredient[]
);

export const getGroupedIngredients = (ingredients: TIngredient[]): TCountedIngredient[] =>  (
  ingredients.reduce<TCountedIngredient[]>((groupedIngredients: TCountedIngredient[], item: TIngredient) => {
    const addedElement = groupedIngredients.find((el) => el._id === item._id);
    if (addedElement) {
      addedElement.count += 1;
      return groupedIngredients;
    }
    return [...groupedIngredients, { ...item, count: 1 }];
  }, [])
);

export const getOrderPrice = (ingredients: TCountedIngredient[]): number => {
  const sum = ingredients.reduce((acc: number, ingredient: TCountedIngredient) => acc + (ingredient.price * ingredient.count), 0);
  return sum;
};

export const getLocalizedOrderStatus = (status: TOrderStatus) => {
  switch (status) {
    case 'done':
      return 'Выполнен';
    case 'pending':
      return 'Готовится';
    case 'created':
      return 'Принят';
    default:
      throw new Error('invalid status');
  }
}