import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../types.ts";
import theme from "../../../util/theme.ts";
import { ThemeState } from "./types.ts";

const INITIAL_THEME = "dark";
const THEME_LOCAL_STORAGE_KEY = "theme";

function saveThemeToLocalStorage(theme: string) {
  localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme);
}

function loadThemeFromLocalStorage(): string {
  const theme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
  if (theme) return theme;
  return INITIAL_THEME;
}

const initialState: ThemeState = {
  selectedTheme: loadThemeFromLocalStorage(),
  themes: Object.entries(theme).map((entry) => entry[0]),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.selectedTheme = action.payload;
      saveThemeToLocalStorage(action.payload);
    },
  },
});

export const selectTheme = (state: RootState) => state.theme;

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
