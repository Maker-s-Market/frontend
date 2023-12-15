import axios from "axios";

/**
 * Axios instance with a base URL.
 * @type {axios.AxiosInstance}
 */
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});