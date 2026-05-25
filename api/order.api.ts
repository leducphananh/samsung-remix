import { Order, OrderDetail } from '@/types/order.type';
import { apiClient } from './client';

export async function getOrders() {
  const response = await apiClient.get<Order[]>('/api/orders');
  return response.data;
}

export async function getOrder(id: string) {
  const response = await apiClient.get<OrderDetail>(`/api/orders/${id}`);
  return response.data;
}
