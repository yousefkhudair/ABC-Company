import { createRoot } from "react-dom/client";
import React from "react";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import App from "./App";
import "./index.css";

// Load from .env file without fallback to test environment variable loading
const LAUNCHDARKLY_CLIENT_ID = import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID;

async function initLD() {
  try {
    // More detailed logging for debugging
    console.log("All environment variables:", import.meta.env);
    console.log("Direct env variable value:", import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID);
    
    // Check for LaunchDarkly client ID with fallback
    const clientID = LAUNCHDARKLY_CLIENT_ID;
    
    if (!clientID) {
      throw new Error("LaunchDarkly client ID not found. Please ensure you have set VITE_LAUNCHDARKLY_CLIENT_ID in your .env file.");
    }

    const LDProvider = await asyncWithLDProvider({
      clientSideID: clientID,
      options: {
        bootstrap: "localStorage",
        baseUrl: "https://app.launchdarkly.com",
        streaming: true,
        privateAttributes: [],
        allAttributesPrivate: false
      },
      flags: {
        showFlightStatus: false,
        showDealsButton: false,
        displayDestinations: false,
      },
      context: {
        kind: 'user',
        key: localStorage.getItem("user_id") || `anonymous-${Math.random().toString(36).substring(2, 15)}`,
        isPremium: false,
        anonymous: true
      }
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
