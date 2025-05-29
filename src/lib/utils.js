import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const getToken = () => useAuthStore.getState().token;

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const BASE_API_URL = import.meta.env.VITE_BACKEND_API_URL;
export const NODE_ENV = import.meta.env.VITE_NODE_ENV;

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || "https://your-api.com/api",
  withCredentials: true, // if needed for cookies
});

api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { api };

export const getCloudinaryUrl = (
  publicUrl,
  { width, height, crop = 'fill', quality = 'auto', format = 'auto', dpr = '' }
) => {
  const baseParts = publicUrl?.split('/upload/');
  if (baseParts?.length !== 2) return publicUrl;

  let transformation = `w_${width},h_${height},c_${crop},q_${quality},f_${format}`;
  if (dpr) transformation += `,dpr_${dpr}`;

  return `${baseParts[0]}/upload/${transformation}/${baseParts[1]}`;
};
