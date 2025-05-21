import "./AppMenu.css";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { selectCartCount } from "../../redux/features/cartSlice/cartSlice.ts";
import { logOut } from "../../redux/features/authSlice/authSlice.ts";
import ThemeSelector from "../ThemeSelector/ThemeSelector.tsx";
import { useContext } from "react";
import { ThemeContext } from "../../AppWrap.tsx";
import AppMenuButton from "./components/AppMenuButton/AppMenuButton.tsx";

export default function AppMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  const cartCount = useAppSelector(selectCartCount);

  const onCartClick = () => {
    navigate("/cart");
  };

  const onLogOutClick = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div
      className={"app-menu"}
      style={{ backgroundColor: theme.backgroundTwo, color: theme.secondary }}
    >
      <div style={{ display: "flex" }}>
        <ThemeSelector />
        <AppMenuButton onClick={onLogOutClick} label={"Log out"} />
      </div>

      <AppMenuButton
        onClick={onCartClick}
        label={"Cart"}
        badgeCount={cartCount}
      />
    </div>
  );
}
