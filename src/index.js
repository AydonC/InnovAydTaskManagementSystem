import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client'
import App from "./App";

// Create a root element using createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render your app inside the root element
root.render(
  <App />
);
