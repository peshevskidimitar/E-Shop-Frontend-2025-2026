export interface CartItemResponse {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

export interface ShoppingCartResponse {
  id: number | null;
  cartItems: CartItemResponse[];
}

export interface AddToShoppingCartRequest {
  productId: number;
  quantity: number;
}