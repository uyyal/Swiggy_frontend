import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../Data/api';
import Navbar from '../Navbar';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful");
        setEmail("");
        setPassword("");

        localStorage.setItem('loginToken', data.token);

        const vendorId = data.vendorId;
        if (vendorId) {
          const vendorresponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
          const vendorData = await vendorresponse.json();

          if (vendorresponse.ok) {
            const vendorFirmId = vendorData.vendorFirmId;
            localStorage.setItem('firmId', vendorFirmId);
          }
        }

        navigate('/');
        // window.location.reload(); // Force reload for Navbar to update
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Login failed due to server error");
    }
  };

  return (
    <div className='login'>
      <Navbar />
      <ToastContainer />
      <h2>Vendor Login</h2><br />
      <form className='form1' onSubmit={loginHandler}>
        <label className='label1'>Email</label><br />
        <input
          className='input1'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder='Enter your email'
          autoComplete="email"
        /><br /><br />

        <label className='label1'>Password</label><br />
        <div className="password-wrapper">
          <input
            className='input1'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder='Enter your password'
            autoComplete="current-password"
          />
          <span
            className="toggle-password"
            onClick={togglePasswordVisibility}
            title={showPassword ? "Hide Password" : "Show Password"}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div><br />

        <button className='btn1' type='submit'>Login</button><br />
        <p>Don't have an account? <Link to="/Register">Create an Account</Link></p>
      </form>
    </div>
  );
};

export default Login;
