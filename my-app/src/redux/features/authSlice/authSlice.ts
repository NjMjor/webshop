import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoginFormState } from "../../../pages/LoginPage/types.ts";
import { login } from "./authApi.ts";
import type { RootState } from "../../types.ts";
import { AuthenticationState } from "./types.ts";

const TOKEN_LOCAL_STORAGE_KEY = "token";

function loginUser() {
  return localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, "token");
}

function isUserLoggedIn() {
  return localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) !== null;
}

function logoutUser() {
  localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
}

const initialState: AuthenticationState = {
  isUserLoggedIn: isUserLoggedIn(),
  isLoading: false,
  loginError: "",
};

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async ({ username, password }: LoginFormState, { rejectWithValue }) => {
    const { data, error } = await login({ username, password });

    if (error) {
      return rejectWithValue(error);
    }

    return data;
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearLoginError: (state) => {
      state.loginError = "";
    },
    logOut: (state) => {
      state.isUserLoggedIn = false;
      logoutUser();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.loginError = "";
      })
      .addCase(loginAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isUserLoggedIn = true;
        loginUser();
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.loginError = action.payload as string;
      });
  },
});

export const { logOut, clearLoginError } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
