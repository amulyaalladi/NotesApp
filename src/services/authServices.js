import axios from "axios";

// BE-Notes mounts auth routes at the server root ("/auth"), while
// VITE_API_URL points at ".../api" for the notes endpoints
// (see BE-Notes/app.js: app.use('/api/notes', ...) vs app.use('/auth', ...)).
// We derive the auth root from the same env var so there's still just one
// place to configure the backend URL.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002/api";
const AUTH_ROOT = API_URL.replace(/\/api\/?$/, "");

const authApi = axios.create({
  baseURL: `${AUTH_ROOT}/auth`,
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("notes_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (userData) => {
  const { data } = await authApi.post("/register", userData);
  return data;
};

export const loginUser = async (credentials) => {
  const { data } = await authApi.post("/login", credentials);
  return data;
};

export const logoutUser = async () => {
  const { data } = await authApi.post("/logout");
  return data;
};

export const fetchCurrentUser = async () => {
  const { data } = await authApi.get("/me");
  return data;
};

// These two are NOT implemented on the backend yet (no forgot/reset-password
// controller or routes exist in BE-Notes as of this build) — wired up to the
// conventional REST paths so they're ready to go the moment those routes are
// added, but calling them right now will 404.
export const forgotPassword = async (email) => {
  const { data } = await authApi.post("/forgot-password", { email });
  return data;
};

export const resetPassword = async (token, payload) => {
  const { data } = await authApi.post(`/reset-password/${token}`, payload);
  return data;
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  fetchCurrentUser,
  forgotPassword,
  resetPassword,
};
