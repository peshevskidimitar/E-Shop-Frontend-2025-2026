import axiosInstance from '../axios/axios.ts';

const productApi = {
  findAll: async () => {
    return await axiosInstance.get('/products');
  }
};

export default productApi;