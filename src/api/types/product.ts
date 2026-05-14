import type { CategoryResponse } from './category.ts';

export interface ProductResponse {
  id: number,
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
}

export interface ProductDetailsResponse {
  id: number,
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: CategoryResponse;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
}