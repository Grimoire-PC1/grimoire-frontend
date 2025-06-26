import axios, { AxiosError } from "axios";

const api_url = "http://localhost:8082" // URL_CONSTS.BACKEND // "http://150.165.111.156:8080/"; // import.meta.env.VITE_BACKEND_URL ??   

export const axiosInstace = axios.create({
  baseURL: api_url,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "any",
    "Content-Type": "application/json",
  }
});

axiosInstace.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("grimoireToken")
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
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstace;
