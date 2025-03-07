import React, { useState } from "react";
import "./Login.css";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase"; 

const LoginPortal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

 
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      alert("Registration successful!");
      setIsLogin(true);
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setTimeout(() => {
      setLoading(false);
      isLogin ? handleLoginSubmit() : handleRegisterSubmit()
    }, 3000); 
  };

  return (
    <div className="background">
      <div className="overlay">
        <div className="login-container">
          <p>{isLogin ? "User Login" : "User Register"}</p>
          <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
            {!isLogin && (
              <div className="input-group">
                <label htmlFor="fullname">Full Name</label>
                <FaUser className="icon" />
                <input
                  type="text"
                  id="fullname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your Full Name"
                  required
                />
              </div>
            )}

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <FaEnvelope className="icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <FaLock className="icon" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {isLogin && (
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe">Remember me</label>
                <a href="/forgot-password">Forgot Password?</a>
              </div>
            )}

            <button type="submit" className="login-btn" onClick={() => handleClick}>
              {isLogin ? "Login" : "Register"}
              
            </button>

            <div className="sign" onClick={() => setIsLogin(!isLogin)}>
              {isLogin
                ? "Don't have an account? Sign up now"
                : "Already have an account? Log in now"}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPortal;
