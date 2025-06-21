import React from 'react';
import './Welcome.css';

const Welcome = () => {
  const firmName = localStorage.getItem("firmName");

  return (
    <div className="welcomeSection">
      <div className="welcomeCard">
        <h2 className="welcomeTitle">Welcome, {firmName} 👋</h2>

        <p className="welcomeSubtitle">
          You're now logged in to your personalized <strong>Vendor Dashboard</strong>. This platform is designed to help you manage your firm and products with ease. Here’s what you can do:
        </p>

        <ul className="welcomeList">
          <li>Add and update your firm with categories, offers, and regions.</li>
          <li>Upload new products with images, pricing, and best-seller tags.</li>
          <li>View all added products in a clean, organized table.</li>
          <li>Securely log in and manage your vendor account anytime.</li>
          <li>Enjoy a mobile-friendly experience with a responsive UI.</li>
        </ul>

        <div className="landingImage">
          <img src="/assets/chef.jpg" alt="Welcome" className="welcomeImage" />
        </div>

        <p className="welcomeFooter">
          ✅ Use the sidebar to get started. Grow your business and connect your firm to more customers!
        </p>
      </div>
    </div>
  );
};

export default Welcome;
