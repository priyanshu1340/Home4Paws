import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/users/refresh");
        return api(originalRequest);
      } catch (error) {
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);
