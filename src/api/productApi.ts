import axiosInstance from '../axios/axios.ts';
import type { ProductFormData, Product, ProductDetails } from './types/product.ts';

const productApi = {
  findAll: async () => {
    return await axiosInstance.get<Product[]>('/products');
  },
  findWithDetailsById: async (id: string) => {
    return await axiosInstance.get<ProductDetails>(`/products/${id}/details`);
  },
  add: async (data: ProductFormData) => {
    return await axiosInstance.post<Product>('/products/add', data);
  },
  edit: async (id: string, data: ProductFormData) => {
    return await axiosInstance.put<Product>(`/products/${id}/edit`, data);
  },
  delete: async (id: string) => {
    return await axiosInstance.delete<Product>(`/products/${id}/delete`);
  }
};

export default productApi;