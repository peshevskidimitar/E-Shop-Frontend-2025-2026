import axiosInstance from '../axios/axios.ts';
import type { CreateProductRequest, ProductResponse, ProductDetailsResponse } from './types/product.ts';

const productApi = {
  findAll: async () => {
    return await axiosInstance.get<ProductResponse[]>('/products');
  },
  findWithDetailsById: async (id: string) => {
    return await axiosInstance.get<ProductDetailsResponse>(`/products/${id}/details`);
  },
  add: async (data: CreateProductRequest) => {
    return await axiosInstance.post<ProductResponse>('/products/add', data);
  },
  edit: async (id: string, data: CreateProductRequest) => {
    return await axiosInstance.put<ProductResponse>(`/products/${id}/edit`, data);
  },
  delete: async (id: string) => {
    return await axiosInstance.delete<ProductResponse>(`/products/${id}/delete`);
  }
};

export default productApi;