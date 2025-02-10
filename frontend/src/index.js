import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { RecipesContextProvider } from "./context/RecipesContext";
import { AuthContextProvider } from "./context/AuthContext"; // Ensure authentication context is also wrapped

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RecipesContextProvider>
        <App />
      </RecipesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
