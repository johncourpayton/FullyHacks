import React from "react";
import ReactDOM from "react-dom/client";
import "@arcgis/core/assets/esri/themes/light/main.css";
import "./styles.css";
import OceanGuardDashboard from "./components/OceanGuardDashboard.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <OceanGuardDashboard />
  </React.StrictMode>
);
