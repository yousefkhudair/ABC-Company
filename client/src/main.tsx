import { createRoot } from "react-dom/client";
import React from "react";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import App from "./App";
import "./index.css";

// Ensure we're explicitly reading from .env file and persist it
const LAUNCHDARKLY_CLIENT_ID = import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID || '67ce189f69541009d2700800';

async function initLD() {
  try {
    // More detailed logging for debugging
    console.log("All environment variables:", import.meta.env);
    
    // Check for LaunchDarkly client ID
    const clientID = LAUNCHDARKLY_CLIENT_ID;
    console.log("LaunchDarkly Client ID:", clientID);
    
    if (!clientID) {
      throw new Error("LaunchDarkly client ID not found. Please ensure you have set VITE_LAUNCHDARKLY_CLIENT_ID in your .env file.");
    }

    const LDProvider = await asyncWithLDProvider({
      clientSideID: clientID,
      options: {
        bootstrap: "localStorage",
        baseUrl: "https://app.launchdarkly.com",
        streaming: true
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
