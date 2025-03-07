import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f8f9fa",
      textAlign: "center",
      color: "#333",
      padding: "20px",
    },
    heading: {
      fontSize: "3rem",
      marginBottom: "20px",
      color: "#d9534f", // Red to highlight the error
    },
    paragraph: {
      fontSize: "1.2rem",
      marginBottom: "10px",
    },
    link: {
      marginTop: "20px",
      padding: "10px 20px",
      fontSize: "1rem",
      color: "#fff",
      backgroundColor: "#007bff",
      textDecoration: "none",
      borderRadius: "5px",
      transition: "background-color 0.3s",
    },
    linkHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.paragraph}>
        Oops! The page you’re looking for doesn’t exist or is down.
      </p>
      <p style={styles.paragraph}>
        You might have mistyped the URL or the page may have been removed. Let’s
        get you back on track!
      </p>
      <Link
        to="/dashboard"
        style={styles.link}
        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.linkHover.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.link.backgroundColor)}
      >
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
