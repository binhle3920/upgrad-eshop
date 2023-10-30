import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/auth-provider";

function ConnectedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

ReactDOM.render(<ConnectedApp />, document.getElementById("root"));
