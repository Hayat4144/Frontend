export const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_BACKEND_DEV_URL
  : import.meta.env.VITE_BACKEND_URL;
