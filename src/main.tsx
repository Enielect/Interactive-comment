import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../src/index.css";
import { CommentProvider } from "./contexts/CommentData.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CommentProvider>
      <App />
    </CommentProvider>
  </React.StrictMode>
);
