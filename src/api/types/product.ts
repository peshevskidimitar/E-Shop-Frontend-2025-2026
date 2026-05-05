import type { Category } from './category.ts';

export interface Product {
  id: number,
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
}

export interface ProductDetails {
  id: number,
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: Category;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
}