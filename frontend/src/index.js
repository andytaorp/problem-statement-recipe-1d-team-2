import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from "./App";
import { RecipesContextProvider } from "./context/RecipesContext";
import { AuthContextProvider } from "./context/AuthContext"; // Ensure authentication context is also wrapped

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RecipesContextProvider>
        <App />
      </RecipesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
