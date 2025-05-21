import { useAppSelector } from "./redux/hooks.ts";
import { selectTheme } from "./redux/features/themeSlice/themeSlice.ts";
import { BrowserRouter } from "react-router";
import { createContext, ReactNode } from "react";
import theme, { Theme } from "./util/theme.ts";

export const ThemeContext = createContext({
  ...theme.blue,
});

export default function AppWrap({ children }: { children: ReactNode }) {
  const themeState = useAppSelector(selectTheme);

  const selectedThemeValue =
    theme[themeState.selectedTheme as keyof Theme] ?? theme.dark;

  return (
    <ThemeContext.Provider value={selectedThemeValue}>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeContext.Provider>
  );
}
