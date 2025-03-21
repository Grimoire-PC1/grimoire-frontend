import { useUserStore } from "../stores/user/user.store";
import axios, { AxiosError } from "axios";

const api_url = import.meta.env.VITE_API_URL ??  "http://localhost:8082/" // "https://grimoire/grimoire-backend/api/"; //

export const axiosInstace = axios.create({
  baseURL: api_url,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "any",
    "Content-Type": "application/json",
  }
});

axiosInstace.interceptors.request.use((config) => {
  let token = sessionStorage.getItem("grimoireToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

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
