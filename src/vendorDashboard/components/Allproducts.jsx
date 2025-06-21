import React, { useState, useEffect } from 'react';
import { API_URL } from '../Data/api';
import './AllProducts.css'; // Import the CSS

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const productsHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductsData = await response.json();
      setProducts(newProductsData.products || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
      alert('Failed to fetch products');
    }
  };

  useEffect(() => {
    productsHandler();
  }, []);

  const deleteProductById = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId));
        alert("Product deleted successfully");
      }
    } catch (error) {
      console.error('Failed to delete product');
      alert('Failed to delete product');
    }
  };

  return (
    <div className="product-section">
      {products.length === 0 ? (
        <p className="no-products">No products added</p>
      ) : (
        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr className="table-header">
                <th>Product Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id} className="table-row">
                  <td>{item.productName}</td>
                  <td>₹{item.price}</td>
                  <td>
                    {item.image && (
                      <img
                        src={`${API_URL}/uploads/${item.image}`}
                        alt={item.productName}
                        className="product-image"
                      />
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => deleteProductById(item._id)}
                      className="delete-btn"
                    >
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

export default AllProducts;
