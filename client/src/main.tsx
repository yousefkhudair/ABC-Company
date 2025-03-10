import { createRoot } from "react-dom/client";
import React from 'react';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';
import App from "./App";
import "./index.css";

// Initialize LaunchDarkly asynchronously
const initLD = async () => {
  try {
    const LDProvider = await asyncWithLDProvider({
      clientSideID: import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID,
      options: {
        bootstrap: 'localStorage'
      },
      flags: {
        showFlightStatus: false // Default value if flag isn't found
      }
    });

    createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <LDProvider>
          <App />
        </LDProvider>
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize LaunchDarkly:', error);
    // Render the app without LaunchDarkly if initialization fails
    createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
};

initLD();