import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

function mount() {
  const container = document.getElementById("root");
  
  if (!container) return;

  try {
    const root = createRoot(container);
    root.render(<App />);
  } catch (err) {
    container.innerHTML = "<div style='padding:20px; color:red;'>Error al iniciar aplicación.</div>";
  }
}

// Ensure DOM is ready, though wp_enqueue_script (footer) handles this
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
