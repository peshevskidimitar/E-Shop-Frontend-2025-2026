import { createContext } from 'react';
import type { CreateProductRequest, ProductResponse } from '../api/types/product.ts';

export interface ProductsContextType {
  products: ProductResponse[];
  loading: boolean;
  onAdd: (data: CreateProductRequest) => Promise<void>;
  onEdit: (id: number, data: CreateProductRequest) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType>({} as ProductsContextType);

export default ProductsContext;