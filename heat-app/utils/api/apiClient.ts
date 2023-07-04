import axios from 'axios';

const BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;

const apiClient = axios.create({
  baseURL: BACK_END_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
