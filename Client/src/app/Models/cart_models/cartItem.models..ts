export interface ICartItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: string;
  };
  quantity: number;
}
export interface PutCartItem {
  product: number;
  quantity: number;
}
