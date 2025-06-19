import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem('loginToken');

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  if (!isLoggedIn) return null; // Optional: Hide sidebar if not logged in

  return (
    <>
      <div className="hamburger" onClick={toggleSidebar} aria-label="Toggle menu">
        ☰
      </div>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/AddFirm" onClick={closeMenu}>Add Firm</Link></li>
          <li><Link to="/AddProduct" onClick={closeMenu}>Add Product</Link></li>
          <li><Link to="/AllProducts" onClick={closeMenu}>All Products</Link></li>
          <li><Link to="/UserDetails" onClick={closeMenu}>User Details</Link></li>
          
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
