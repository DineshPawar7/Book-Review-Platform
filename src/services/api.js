import axios from "axios";

const API = axios.create({
  baseURL: "https://book-review-platform-dzkb.onrender.com/api",
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);


export default API;
