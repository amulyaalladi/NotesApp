import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/authSlice";

// NOTE: Vite exposes env vars via import.meta.env, not process.env (the
// original code used process.env.VITE_API_URL, which is undefined in the
// browser and silently produced baseURL: undefined).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g. http://localhost:3002/api
  withCredentials: true, // send the httpOnly "token" cookie set on login
});

// Attach the JWT as a Bearer header too, so requests work whether the
// backend reads it from the cookie or the Authorization header (BE-Notes/auth.js
// checks both).
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("notes_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is missing/invalid/expired, the backend's isAuthenticated
// middleware responds 401. Catch that here so a stale session doesn't just
// silently fail to load notes — clear it and send the user back to /login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
export default api;