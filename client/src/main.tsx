import { createRoot } from "react-dom/client";
import React from "react";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import App from "./App";
import "./index.css";

async function initLD() {
  try {
    // More detailed logging for debugging
    console.log("Environment variables available:", {
      VITE_LAUNCHDARKLY_CLIENT_ID: import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID,
    });
    
    if (!import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID) {
      throw new Error("LaunchDarkly client ID not found");
    }

    const LDProvider = await asyncWithLDProvider({
      clientSideID: import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID,
      options: {
        bootstrap: "localStorage",
        baseUrl: "https://app.launchdarkly.com",
      },
      flags: {
        showFlightStatus: false,
      },
    } as any);

    render(LDProvider);
  } catch (error) {
    console.error("LaunchDarkly initialization failed:", error);
    // Still render the app without feature flags
    render();
  }
}

// Separate render function for better error handling
function render(LDProvider?: React.ComponentType<any>) {
  const AppWithProvider = LDProvider ? (
    <React.StrictMode>
      <LDProvider>
        <App />
      </LDProvider>
    </React.StrictMode>
  ) : (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  createRoot(document.getElementById("root")!).render(AppWithProvider);
}

initLD();
