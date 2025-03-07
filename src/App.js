import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; 
import Dashboard from "./Pages/Dashboard.jsx";
import Login from "./Pages/Login.jsx";
import NotFound from "./Pages/NotFound.jsx";
import ErrorBoundary from "./ErrorBoundary";


const setupGlobalErrorHandlers = () => {
  window.onerror = (message, source, lineno, colno, error) => {
    console.error("Caught global error:", message, error);
    window.location.replace("/not-found");
    return true; 
  };

  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);
    window.location.replace("/not-found");
  });
};

const App = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("user");
  const [isErrorHandled, setIsErrorHandled] = useState(false);

  useEffect(() => {
    setupGlobalErrorHandlers(); 
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUserRole(currentUser.email === "admin@example.com" ? "admin" : "user"); //will implement this later
      }
      setIsErrorHandled(true); 
    });

    return () => unsubscribe(); 
  }, []);

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
