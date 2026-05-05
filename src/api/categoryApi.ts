import axiosInstance from '../axios/axios.ts';
import type { Category } from './types/category.ts';

const categoryApi = {
  findAll: async () => {
    return await axiosInstance.get<Category[]>('/categories');
  }
};

export default categoryApi;