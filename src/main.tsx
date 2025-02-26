import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import DynamicLabProvider from "./providers/DynamiclabProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DynamicLabProvider>
      <App />
    </DynamicLabProvider>
  </StrictMode>
);
