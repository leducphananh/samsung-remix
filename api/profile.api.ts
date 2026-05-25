import { Profile } from '@/types/profile.type';
import { apiClient } from './client';

export async function getProfile() {
  const response = await apiClient.get<Profile>('/api/profile');
  return response.data;
}
