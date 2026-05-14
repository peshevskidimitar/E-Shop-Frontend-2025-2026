import axiosInstance from '../axios/axios.ts';
import type { AddToShoppingCartRequest, ShoppingCartResponse } from './types/shoppingCart.ts';

const shoppingCartApi = {
  find: async () => {
    return await axiosInstance.get<ShoppingCartResponse>('/shopping-cart');
  },
  add: async (data: AddToShoppingCartRequest) => {
    return await axiosInstance.post<ShoppingCartResponse>('/shopping-cart/add', data);
  },
  remove: async (productId: number) => {
    return await axiosInstance.delete<ShoppingCartResponse>(`/shopping-cart/remove/${productId}`);
  },
  checkout: async () => {
    return await axiosInstance.post<void>('/shopping-cart/checkout');
  }
};

export default shoppingCartApi;