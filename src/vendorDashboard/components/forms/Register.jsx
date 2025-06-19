import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../Data/api';
import Navbar from '../Navbar';
import './Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus(); // Auto focus on username field
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (response.ok) {
        toast.success("Vendor registered successfully");
        setUsername("");
        setEmail("");
        setPassword("");
        setTimeout(() => navigate('/Login'), 1500);
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='register'>
      <Navbar />
      <ToastContainer />
      <h3>Vendor Registration</h3><br />
      <div className="registerform">
        <form className='form2' onSubmit={handleSubmit} noValidate>
          <label className='label2'>Username</label><br />
          <input
            type="text"
            name='username'
            value={username}
            className='input2'
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter your Name'
            ref={usernameRef}
            required
          /><br />

          <label className='label2'>Email</label><br />
          <input
            type="email"
            name='email'
            value={email}
            className='input2'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
          /><br />

          <label className='label2'>Password</label><br />
          <div className="password-wrapper">
            <input
              className='input2'
              name='password'
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              required
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <br />

          <button className='btn2' type='submit' disabled={loading}>
            {loading ? "Registering..." : "SignUp"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
