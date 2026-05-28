import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

/* Load theme BEFORE React renders */

const savedSettings = JSON.parse(
  localStorage.getItem("adminSettings")
);

if (savedSettings?.darkMode === false) {
  document.documentElement.classList.add("admin-light");
  document.documentElement.classList.remove("admin-dark");
} else {
  document.documentElement.classList.add("admin-dark");
  document.documentElement.classList.remove("admin-light");
}

/* Theme colors */

const themeColors = {
  orange: "#ff7a00",
  blue: "#3b82f6",
  emerald: "#10b981",
  purple: "#a855f7",
};

document.documentElement.style.setProperty(
  "--admin-primary",
  themeColors[savedSettings?.themeColor] || "#ff7a00"
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);