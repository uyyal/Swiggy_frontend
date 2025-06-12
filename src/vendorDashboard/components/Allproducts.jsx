import React, { useState, useEffect } from 'react';
import { API_URL } from '../Data/api';
import './Allproducts.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [firmIdExists, setFirmIdExists] = useState(true); // for conditionally rendering content

  const productHandler = async () => {
    const firmId = localStorage.getItem('firmId');

    if (!firmId) {
      setFirmIdExists(false);
      toast.error('Please add a firm first to view products.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const newProductdata = await response.json();
      setProducts(newProductdata.products || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

  const deleteProduct = async (productId) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId));
        toast.success(data.message || "Product deleted successfully");
      } else {
        toast.error(data.error || "Failed to delete product");
      }
    } catch (error) {
      console.error('Failed to delete product', error);
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="all-products-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="all-products-heading">All Products</h2>

      {!firmIdExists ? (
        <p className="no-products">Please add a firm to view products.</p>
      ) : products.length === 0 ? (
        <p className="no-products">No products added yet</p>
      ) : (
        <div className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id}>
                  <td>{item.productName}</td>
                  <td>₹{item.price}</td>
                  <td>
                    {item.image ? (
                      <img
                        src={`${API_URL}/uploads/${item.image}`}
                        alt={item.productName}
                        className="product-image"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteProduct(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Allproducts;
