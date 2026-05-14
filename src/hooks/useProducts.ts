import { useContext } from 'react';
import ProductsContext, { type ProductsContextType } from '../contexts/productsContext.ts';

const useProducts = () => useContext<ProductsContextType>(ProductsContext);

export default useProducts;