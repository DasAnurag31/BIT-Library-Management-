import axios from 'axios';
const BASE_URL = 'http://localhost:8000/api/v1';

// Create an axios instance 
export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // for allowing cookies and managing CORS
});

export const axiosApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // for allowing cookies and managing CORS
});

// setting default for content type
authApi.defaults.headers.common['Content-Type'] = 'application/json';