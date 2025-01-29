import { useUserStore } from "../stores/user/user.store";
import axios, { AxiosError } from "axios";

const api_url = import.meta.env.VITE_API_URL ?? "https://grimoire/grimoire-backend/api/"; // "http://localhost:8080/api" // 

const axiosInstace = axios.create({
  baseURL: api_url,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "any"
  }
});

axiosInstace.interceptors.request.use((config) => {
  let token = useUserStore.getState().user?.token;
  if (!token) {
    const sessionToken = sessionStorage.getItem("grimoire_user_token");
    if (sessionToken) {
      token = sessionToken;
    }
  }
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosInstace.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      window.location.href = "/grimoire/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstace;
