import React from "react";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/auth/auth-provider";
import { createRoot } from "react-dom/client";
import ProductsProvider from "./context/products/products-provider";
import SnackbarProvider from "./context/snackbar/snackbar-provider";
import CustomSnackbar from "./common/components/Snackbar";

function ConnectedApp() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <SnackbarProvider>
          <App/>
          <CustomSnackbar/>
        </SnackbarProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")).render(<ConnectedApp/>);
