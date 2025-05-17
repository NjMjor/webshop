import "./App.css";
import { Link, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import { useAppSelector } from "./redux/hooks.ts";
import { selectAuth } from "./redux/features/authSlice/authSlice.ts";
import ProductsPage from "./pages/ProductsPage/ProductsPage.tsx";
import type { ReactElement } from "react";
import ProductPage from "./pages/ProductPage/ProductPage.tsx";
import TextInput from "./components/TextInput/TextInput.tsx";
import AppMenu from "./components/AppMenu/AppMenu.tsx";
import CartPage from "./pages/CartPage/CartPage.tsx";

function App() {
  const { isUserLoggedIn } = useAppSelector(selectAuth);

  if (!isUserLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={(<LoginPage />) as ReactElement} />
      </Routes>
    );
  }

  return (
    <div>
      <AppMenu />
      <div className={"main-layout-header"}>
        <Link
          to={"/products"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h1>Shop</h1>
        </Link>
        <TextInput placeHolder={"Search for anything"}></TextInput>
      </div>
      <Routes>
        <Route path={"/"} element={<ProductsPage />} />
        <Route path={"/products"} element={<ProductsPage />} />
        <Route path={"/products/:id"} element={<ProductPage />} />
        <Route path={"/cart"} element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
