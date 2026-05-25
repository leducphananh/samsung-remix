import { Banner } from '@/types/banner.type';
import { apiClient } from './client';

export async function getBanners() {
  const response = await apiClient.get<Banner[]>('/api/banners');
  return response.data;
}
