import axiosInstance from '../axios/axios.ts';
import type { CategoryResponse } from './types/category.ts';

const categoryApi = {
  findAll: async () => {
    return await axiosInstance.get<CategoryResponse[]>('/categories');
  }
};

export default categoryApi;