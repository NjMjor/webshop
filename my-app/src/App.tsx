import "./App.css";
import { Link, Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import { useAppSelector } from "./redux/hooks.ts";
import { selectAuth } from "./redux/features/authSlice/authSlice.ts";
import ProductsPage from "./pages/ProductsPage/ProductsPage.tsx";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage.tsx";
import TextInput from "./components/TextInput/TextInput.tsx";
import AppMenu from "./components/AppMenu/AppMenu.tsx";
import CartPage from "./pages/CartPage/CartPage.tsx";
import { useContext } from "react";
import { ThemeContext } from "./AppWrap.tsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound.tsx";

function App() {
  const theme = useContext(ThemeContext);
  const { isUserLoggedIn } = useAppSelector(selectAuth);

  if (!isUserLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path={"*"} element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <div style={{ backgroundColor: theme.background }} className={"app"}>
      <AppMenu />
      <div
        className={"main-layout-header"}
        style={{ backgroundColor: theme.background, color: theme.secondary }}
      >
        <Link
          to={"/products"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h1>Shop</h1>
        </Link>
        <TextInput
          disableError={true}
          placeHolder={"TODO: Search for anything..."}
        ></TextInput>
      </div>
      <Routes>
        <Route path={"/"} element={<ProductsPage />} />
        <Route path={"/products"} element={<ProductsPage />} />
        <Route path={"/products/:id"} element={<SingleProductPage />} />
        <Route path={"/cart"} element={<CartPage />} />
        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
