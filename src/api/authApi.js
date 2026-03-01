import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Shared axios instance — all requests get the Bearer token automatically
export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auth endpoints
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser    = (data) => api.post("/auth/login", data);
