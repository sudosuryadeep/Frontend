import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import the provider

const CLIENT_ID =
  "617184936598-njh4rlml8plas2q4tek0eq9hrdtsnkl6.apps.googleusercontent.com";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
