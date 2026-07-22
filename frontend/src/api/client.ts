import axios from 'axios';

const apiUrl = import.meta.env['VITE_API_URL'];

if (!apiUrl) {
  throw new Error('Required environment variable VITE_API_URL is missing. Please define VITE_API_URL in your environment file.');
}

export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
