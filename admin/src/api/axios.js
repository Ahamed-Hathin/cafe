import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT on every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('freddo_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global response error interceptor
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('freddo_token');
      localStorage.removeItem('freddo_admin');
    }
    return Promise.reject(err);
  }
);

export default api;
