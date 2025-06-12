import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('loginToken'); // ensures boolean

  const handleLogout = () => {
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firmId');
    navigate('/Login');
    // window.location.reload(); // Refresh Navbar after logout
  };

  return (
    <div className='navbar'>
      <div className="company">
        <Link to='/'>Vendor Dashboard</Link>
      </div>
      <div className="logins">
        {!isLoggedIn ? (
          <>
            <Link to='/Login'><span>Login /</span></Link>
            <Link to='/Register'><span>Register</span></Link>
          </>
        ) : (
          <button className='logout-btn' onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
