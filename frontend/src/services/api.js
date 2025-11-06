import axios from 'axios';

const BASE_URL = import.meta?.env?.VITE_API_BASE_URL ?? 'http://localhost:3000';

// Cliente global
const api = axios.create({
  baseURL: BASE_URL + '/api',
  timeout: 8000
});

// Interceptores de request (agregar token)
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => Promise.reject(error));

// Interceptores de respuesta (manejo centralizado de errores)
api.interceptors.response.use(res => res, err => {
  if (err.response) {
    const { status, data } = err.response;
    const message = data?.error || data?.message || 'Error en la petición';
    return Promise.reject({ status, message, original: err });
  }
  return Promise.reject({ status: 0, message: 'Sin respuesta del servidor', original: err });
});

export default api;
