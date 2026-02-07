import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ConvexProvider } from "./services/convex";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexProvider>
      <App />
    </ConvexProvider>
  </React.StrictMode>
);
