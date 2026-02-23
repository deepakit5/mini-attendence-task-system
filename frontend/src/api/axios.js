import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const instance = axios.create({
  baseURL: API_BASE,
  withCredentials: true // important: send cookies
});

// Response interceptor to handle global auth errors
instance.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      // optional: dispatch logout via store if desired
    }
    return Promise.reject(err);
  }
);

export default instance;