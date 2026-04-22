import axiosInstance from '../axios/axios.ts';

const productApi = {
  findAll: async () => {
    return await axiosInstance.get('/products');
  },
  findWithDetailsById: async (id: string) => {
    return await axiosInstance.get(`/products/${id}/details`);
  }
};

export default productApi;