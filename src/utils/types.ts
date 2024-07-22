export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TIngredientWithUuid = TIngredient & {
  uuid: string;
};

export type TCountedIngredient = TIngredient & {
  count: number;
};


export enum WebSocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export type TOrderStatus = 'done' | 'created' | 'pending';

export type TOrderCard = {
  _id: string;
  ingredients: string[];
  status: TOrderStatus;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TOrdersData = {
  success: boolean;
  orders: TOrderCard[];
  total: number;
  totalToday: number;
} 