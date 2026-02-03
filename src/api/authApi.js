import axios from "axios";


//All request send to backend will  start with  http://localhost:3000/auth
const API = axios.create({
  baseURL: "http://localhost:3000/auth",
  headers: { "Content-Type": "application/json" }
});


//Add Bearer <token> to the request header
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);



  // working

    // User logs in → loginUser({ email, password }) sends a POST request.

    // Server responds with a token → Frontend stores it in localStorage.setItem("token", response.token).

    // Subsequent requests (e.g., fetching protected data) automatically include the token via the interceptor.