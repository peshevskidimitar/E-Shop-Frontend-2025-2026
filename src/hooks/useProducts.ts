import { useEffect, useState } from 'react';
import productApi from '../api/productApi.ts';

const initialState = {
  products: [],
  loading: true
};

const useProducts = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    productApi
      .findAll()
      .then((response) => {
        setState({
          products: response.data,
          loading: false
        });
      })
      .catch((error) => {
          console.log(error);
          setState({
            products: [],
            loading: false
          });
        }
      );
  }, []);

  return state;
};

export default useProducts;