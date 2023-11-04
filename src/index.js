import React from "react";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/auth/auth-provider";
import { createRoot } from "react-dom/client";

function ConnectedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")).render(<ConnectedApp />);
