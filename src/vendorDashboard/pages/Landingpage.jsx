import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/Addproduct';
import Welcome from '../components/forms/Welcome';
import AllProducts from '../components/Allproducts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Landingpage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken) {
      setShowLogOut(true);
      setShowWelcome(true);
    }
  }, []);

  useEffect(() => {
    const firmName = localStorage.getItem('firmName');
    const firmId = localStorage.getItem('firmId');
    if (firmName || firmId) {
      setShowFirmTitle(false);
      setShowWelcome(true);
    }
  }, []);

  const logOutHandler = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("loginToken");
      localStorage.removeItem("firmId");
      localStorage.removeItem("firmName");
      setShowLogOut(false);
      setShowFirmTitle(true);
      setShowWelcome(false);
      setShowLogin(false);
      toast.info("Logged out successfully", { position: "top-center" });
    }
  };

  const hideAll = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showLoginHandler = () => {
    hideAll();
    setShowLogin(true);
  };

  const showRegisterHandler = () => {
    hideAll();
    setShowRegister(true);
  };

  const showFirmHandler = () => {
    if (showLogOut) {
      hideAll();
      setShowFirm(true);
    } else {
      toast.warn("Please login first", { position: "top-center" });
      setShowLogin(true);
    }
  };

  const showProductHandler = () => {
    if (showLogOut) {
      hideAll();
      setShowProduct(true);
    } else {
      toast.warn("Please login first", { position: "top-center" });
      setShowLogin(true);
    }
  };

  const showWelcomeHandler = () => {
    hideAll();
    setShowWelcome(true);
  };

  const showAllProductsHandler = () => {
    if (showLogOut) {
      hideAll();
      setShowAllProducts(true);
    } else {
      toast.warn("Please login first", { position: "top-center" });
      setShowLogin(true);
    }
  };

  return (
    <>
      <ToastContainer />
      <section className='landingSection'>
        <Navbar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogOut={showLogOut}
          logOutHandler={logOutHandler}
        />
        <div className="collectionSection">
          <Sidebar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showFirmTitle={showFirmTitle}
          />

          {showFirm && showLogOut && <AddFirm />}
          {showProduct && showLogOut && <AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showLogOut && <AllProducts />}
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
        </div>
      </section>
    </>
  );
};

export default Landingpage;
