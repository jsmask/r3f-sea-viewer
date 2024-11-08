import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.scss";
import App from "./App.jsx";
import Intro from "./Intro.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <Intro>
      <App />
    </Intro>
  </>
);
