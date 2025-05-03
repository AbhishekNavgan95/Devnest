import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const BASE_API_URL = import.meta.env.VITE_BACKEND_API_URL;