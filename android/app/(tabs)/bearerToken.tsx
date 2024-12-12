import axios from 'axios';
import { getServerIpAddress, getTokenAuthor } from './data';


// Hàm khởi tạo axios instance với baseURL động
export const createApiClient = async () => {
  const ipAddress = getServerIpAddress();
  const baseURL = ipAddress ? `http://${ipAddress}:8080` : 'http://localhost:8080'; // Dùng localhost làm fallback
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Hàm để thiết lập token
export const setAuthToken = (apiClient: any, token: any) => {
  if (token) {
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.Authorization;
  }
};

export const initializeApiClient = async () => {
  const apiClient = await createApiClient();
  const token = getTokenAuthor();
  setAuthToken(apiClient, token);
  return apiClient;
};

export default initializeApiClient;
