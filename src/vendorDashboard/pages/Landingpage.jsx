import React from 'react';
import { Link } from 'react-router-dom';
import './Landingpage.css';

const Landingpage = () => {
  return (

      <div className="welcome-container">
      <h1>Welcome to Swiggy Clone</h1>
      <p>Order food from your favorite restaurants and get it delivered to your doorstep in minutes!</p>
      
      <div className="features">
        <div className="feature">
          <h3>🍔 Wide Range of Restaurants</h3>
          <p>Choose from top-rated restaurants and street food vendors.</p>
        </div>
        <div className="feature">
          <h3>🚀 Super Fast Delivery</h3>
          <p>Get your food delivered in 30 minutes or less.</p>
        </div>
        <div className="feature">
          <h3>💰 Best Offers</h3>
          <p>Exciting discounts and deals on every order.</p>
        </div>
      </div>

      <div className="buttons">
        <Link to="/Allproducts">
          <button className="btn">Explore Menu</button>
        </Link>
        {/* <Link to="/logout">
          <button className="btn logout-btn">Logout</button>
        </Link> */}
      </div>
    </div>
  );
};

export default Landingpage;
