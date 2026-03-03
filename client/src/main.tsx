console.log("[Main] Script entry reached at " + new Date().toISOString());
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

function mount() {
  console.log("[Main] Starting mount process...");
  const container = document.getElementById("root");
  
  if (!container) {
    console.error("[Main] Error: #root container not found in DOM.");
    return;
  }

  try {
    console.log("[Main] Container found, initializing root...");
    const root = createRoot(container);
    console.log("[Main] Root created, rendering <App />...");
    root.render(<App />);
    console.log("[Main] Render successful.");
  } catch (err) {
    console.error("[Main] Critical error during mount:", err);
    container.innerHTML = "<div style='padding:20px; color:red;'>Error al iniciar aplicación. Revisa la consola.</div>";
  }
}

// Ensure DOM is ready, though wp_enqueue_script (footer) handles this
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
