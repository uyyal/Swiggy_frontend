import React from 'react';
import './Navbar.css';

const Navbar = ({ showLoginHandler, showRegisterHandler, showLogOut, logOutHandler }) => {
  const firmName = localStorage.getItem('firmName');

  return (
    <div className="navSection">
      <div className="navCompany">
        Vendor Dashboard
      </div>

      <div className="navFirm">
        <h4 className="navFirmText">Firm: {firmName || "N/A"}</h4>
      </div>

      <div className="navAuth">
        {!showLogOut ? (
          <>
            <span className="navLink" onClick={showLoginHandler}>Login</span>
            <span className="navLink" onClick={showRegisterHandler}> / Register</span>
          </>
        ) : (
          <span className="navLogout" onClick={logOutHandler}>Logout</span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
