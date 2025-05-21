import "./ThemeSelector.css";
import Popover from "../Popover/Popover.tsx";
import { capitalize } from "../../util/util.ts";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import {
  selectTheme,
  setTheme,
} from "../../redux/features/themeSlice/themeSlice.ts";
import AppMenuButton from "../AppMenu/components/AppMenuButton/AppMenuButton.tsx";

export default function ThemeSelector() {
  const dispatch = useAppDispatch();
  const { themes } = useAppSelector(selectTheme);

  const onChangeThemeClick = (theme: string) => {
    dispatch(setTheme(theme));
  };

  const content = (
    <div className={"theme-selector-content"}>
      {themes.map((theme) => (
        <div
          className={"theme-selector-content-item"}
          onClick={() => {
            onChangeThemeClick(theme);
          }}
        >
          {capitalize(theme)}
        </div>
      ))}
    </div>
  );

  return (
    <Popover content={content}>
      <AppMenuButton label={"Theme"} />
    </Popover>
  );
}
