import { createSlice } from "@reduxjs/toolkit";

// Keep the session across page refreshes. Notes' backend accepts the JWT
// either as an httpOnly cookie OR as a Bearer header (see BE-Notes/auth.js),
// so we also store the raw token to attach it manually via axios.
const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("notes_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const initialState = {
  user: getStoredUser(),
  token: localStorage.getItem("notes_token") || null,
  isAuthenticated: Boolean(localStorage.getItem("notes_token")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload || {};
      state.user = user || null;
      state.token = token || null;
      state.isAuthenticated = Boolean(token);

      if (user) localStorage.setItem("notes_user", JSON.stringify(user));
      if (token) localStorage.setItem("notes_token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("notes_user");
      localStorage.removeItem("notes_token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
