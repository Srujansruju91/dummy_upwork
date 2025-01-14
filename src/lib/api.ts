import axios from 'axios';
import { API_ENDPOINTS } from './constants';

const createApiInstance = (baseURL: string) => {
  const instance = axios.create({ baseURL });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const authApi = createApiInstance(API_ENDPOINTS.AUTH);
export const jobsApi = createApiInstance(API_ENDPOINTS.JOBS);
export const proposalsApi = createApiInstance(API_ENDPOINTS.PROPOSALS);