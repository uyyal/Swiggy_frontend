import React, { useState } from 'react';
import { API_URL } from '../../Data/api';
import { ThreeCircles } from 'react-loader-spinner';
import './Login.css'; // Import CSS

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        alert('Login success');
        setEmail("");
        setPassword("");
        localStorage.setItem('loginToken', data.token);
        showWelcomeHandler();

        const vendorId = data.vendorId;
        const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
        const vendorData = await vendorResponse.json();

        if (vendorResponse.ok) {
          const vendorFirmId = vendorData.vendorFirmId;
          const vendorFirmName = vendorData.vendor.firm[0].firmName;
          localStorage.setItem('firmId', vendorFirmId);
          localStorage.setItem('firmName', vendorFirmName);
        }
        window.location.reload();
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginSection">
      {loading ? (
        <div className="loaderSection">
          <ThreeCircles
            visible={loading}
            height={100}
            width={100}
            color="#4fa94d"
            ariaLabel="three-circles-loading"
          />
          <p className="loadingText">Login in process... Please wait</p>
        </div>
      ) : (
        <form className="authForm" onSubmit={loginHandler} autoComplete="off">
          <h3 className="authTitle">Vendor Login</h3>

          <label className="authLabel">Email</label>
          <input
            type="text"
            className="authInput"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <label className="authLabel">Password</label>
          <div className="passwordField">
            <input
              type={showPassword ? "text" : "password"}
              className="authInput"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <span className="showPassword" onClick={handleShowPassword}>
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <div className="btnSubmit">
            <button type="submit" className="submitButton">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
