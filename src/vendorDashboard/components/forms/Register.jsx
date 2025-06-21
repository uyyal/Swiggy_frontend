import React, { useState } from 'react';
import { API_URL } from '../../Data/api';
import { ThreeCircles } from 'react-loader-spinner';
import './Register.css'; // Be sure to include the CSS

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Vendor registered successfully");
        showLoginHandler();
      } else {
        setError(data.error || "Registration failed. Try again.");
        alert("Registration Failed, Contact Admin");
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerSection">
      {loading ? (
        <div className="loaderSection">
          <ThreeCircles visible={loading} height={100} width={100} color="#4fa94d" />
          <p className="loadingText">Hi, Your Registration is under process</p>
        </div>
      ) : (
        <form className="authForm" onSubmit={handleSubmit} autoComplete="off">
          <h3 className="authTitle">Vendor Register</h3>

          <label className="authLabel">Username</label>
          <input
            className="authInput"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
          />

          <label className="authLabel">Email</label>
          <input
            className="authInput"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <label className="authLabel">Password</label>
          <div className="passwordField">
            <input
              className="authInput"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <span className="showPassword" onClick={handleShowPassword}>
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          {error && <p className="errorText">{error}</p>}

          <div className="btnSubmit">
            <button type="submit" className="submitButton">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
