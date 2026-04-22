import axiosInstance from '../axios/axios.ts';
import type { Product, ProductDetails } from './types/product.ts';

const productApi = {
  findAll: async () => {
    return await axiosInstance.get<Product[]>('/products');
  },
  findWithDetailsById: async (id: string) => {
    return await axiosInstance.get<ProductDetails>(`/products/${id}/details`);
  }
};

export default productApi;