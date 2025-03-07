import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; 
import Dashboard from "./Pages/Dashboard.jsx";
import Login from "./Pages/Login.jsx";
import NotFound from "./Pages/NotFound.jsx";
import ErrorBoundary from "./ErrorBoundary";

// Global error handler setup
const setupGlobalErrorHandlers = () => {
  // Catch uncaught runtime errors
  window.onerror = (message, source, lineno, colno, error) => {
    console.error("Caught global error:", message, error);
    // Immediately redirect to not-found page
    window.location.replace("/not-found");
    return true; // Prevent default browser error handling
  };

  // Catch unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);
    // Immediately redirect to not-found page
    window.location.replace("/not-found");
  });
};

const App = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("user");
  const [isErrorHandled, setIsErrorHandled] = useState(false); // Track error handling state

  useEffect(() => {
    setupGlobalErrorHandlers(); // Setup global error handlers

    // Simulate loading time for app setup
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUserRole(currentUser.email === "admin@example.com" ? "admin" : "user");
      }
      setIsErrorHandled(true); // App is ready once Firebase auth is initialized
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  // Prevent app from rendering until error handling is initialized
  if (!isErrorHandled) return null;

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/dashboard" replace />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard userId={user.uid} /> : <Navigate to="/login" replace />} 
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
