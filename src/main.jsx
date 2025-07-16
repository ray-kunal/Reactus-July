import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GameContext } from "./contexts/GameContext";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GameContext>
      <App></App>
    </GameContext>
  </StrictMode>
);
