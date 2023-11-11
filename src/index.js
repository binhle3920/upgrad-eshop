import React from "react";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/auth/auth-provider";
import { createRoot } from "react-dom/client";
import ProductsProvider from "./context/products/products-provider";

function ConnectedApp() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")).render(<ConnectedApp />);
