import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({
  showFirmHandler,
  showProductHandler,
  showAllProductsHandler,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>

      <div className={`sideBarSection ${menuOpen ? "open" : ""}`}>
        <ul className="menu-list">
          <li
            className="menu-item"
            onClick={() => {
              showFirmHandler();
              setMenuOpen(false);
            }}
          >
            Add Firm
          </li>
          <li
            className="menu-item"
            onClick={() => {
              showProductHandler();
              setMenuOpen(false);
            }}
          >
            Add Product
          </li>
          <li
            className="menu-item"
            onClick={() => {
              showAllProductsHandler();
              setMenuOpen(false);
            }}
          >
            All Products
          </li>
          <li className="menu-item">User Details</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
