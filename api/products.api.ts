import { Product } from '@/types/product.type';
import { apiClient } from './client';

export async function getProducts() {
  const response = await apiClient.get<Product[]>('/api/products');
  return response.data;
}
