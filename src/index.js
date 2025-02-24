import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Asegúrate de que Tailwind CSS esté cargado
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("❌ No se encontró el elemento #root en el DOM.");
}

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
