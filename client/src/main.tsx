import { createRoot } from "react-dom/client";
import React from 'react';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';
import App from "./App";
import "./index.css";

// Initialize LaunchDarkly asynchronously
const initLD = async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID || 'YOUR_CLIENT_SIDE_ID', // Use environment variable
    user: {
      key: 'anonymous-user', // You can dynamically set this based on user session
      name: 'Anonymous User',
      anonymous: true
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
};

initLD();