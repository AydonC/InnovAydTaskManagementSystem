// ErrorBoundary.jsx
import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    console.error("Caught error in Error Boundary:", error);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error info:", info);
  }

  render() {
    if (this.state.hasError) {
      return <Navigate to="/not-found" replace />; // Immediate redirection
    }

    return this.props.children; // Render children if no error
  }
}

export default ErrorBoundary;
