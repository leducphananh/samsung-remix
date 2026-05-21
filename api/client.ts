import axios from 'axios';
import { getTokenFromCookies } from './token';

export const apiClient = axios.create({
  baseURL: '/',
});

apiClient.interceptors.request.use(config => {
  const token =
    getTokenFromCookies() ||
    process.env.NEXT_PUBLIC_MOCK_PRODUCTS_BEARER_TOKEN ||
    'mock-samsung-token';

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
