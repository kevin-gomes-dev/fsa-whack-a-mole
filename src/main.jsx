import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GameProvider } from "./GameContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GameProvider children={App}>
      <App />
    </GameProvider>
  </StrictMode>,
);
