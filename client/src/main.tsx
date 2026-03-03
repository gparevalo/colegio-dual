console.log("[Main] Script execution started at", new Date().toISOString());
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
