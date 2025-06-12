import React, { useState } from 'react';
import { API_URL } from '../../Data/api';
import './Addproduct.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addproduct = () => {
  const [productName, setProductname] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestseller] = useState(null); // changed here
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const Categorychange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const Imageupload = (event) => {
    const selectImage = event.target.files[0];
    setImage(selectImage);
  };

  // Updated handler to store string values
  const handlebestSeller = (event) => {
    setBestseller(event.target.value);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId');

      if (!loginToken || !firmId) {
        toast.error("User not authenticated");
        return;
      }

      if (bestSeller === null) {
        toast.error("Please select if product is Best Seller or not");
        return;
      }

      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('image', image);
      category.forEach((value) => {
        formData.append('category', value);
      });

      // Convert string 'true'/'false' to boolean before appending
      formData.append('bestSeller', bestSeller === 'true');

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Product added successfully");
        // Reset form
        setProductname("");
        setPrice("");
        setCategory([]);
        setBestseller(null);
        setImage(null);
        setDescription("");
      } else {
        toast.error(data.message || "Failed to add product");
      }

    } catch (error) {
      toast.error("Error while adding product");
    }
  };

  return (
    <div className='add-product'>
      <ToastContainer position="top-right" autoClose={3000} />
      <form className='form4' onSubmit={handleAddProduct}>
        <h2 className='h2'>Add Product</h2>

        <label className='label4'>Product Name</label>
        <input
          className='input4'
          type="text"
          value={productName}
          onChange={(e) => setProductname(e.target.value)}
          required
        />

        <label className='label4'>Price</label>
        <input
          className='input4'
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <div className="check-box4">
          <label className='label4'>Category</label>
          <div className="category-row4">
            <div className="checkcontainer4">
              <label className='labelbox4'>Veg</label>
              <input
                className='inputbox4'
                type="checkbox"
                checked={category.includes('veg')}
                value="veg"
                onChange={Categorychange}
              />
            </div>
            <div className="checkcontainer4">
              <label className='labelbox4'>Non-Veg</label>
              <input
                className='inputbox4'
                type="checkbox"
                checked={category.includes('non-veg')}
                value="non-veg"
                onChange={Categorychange}
              />
            </div>
          </div>
        </div>

        <div className="check-box4">
          <label className='label4'>Best Seller</label>
          <div className="category-row4">
            <div className="checkcontainer4">
              <label className='labelbox4'>Yes</label>
              <input
                className='inputbox4'
                type="radio"
                value="true"
                checked={bestSeller === 'true'}
                onChange={handlebestSeller}
              />
            </div>
            <div className="checkcontainer4">
              <label className='labelbox4'>No</label>
              <input
                className='inputbox4'
                type="radio"
                value="false"
                checked={bestSeller === 'false'}
                onChange={handlebestSeller}
              />
            </div>
          </div>
        </div>

        <label className='label4'>Description</label>
        <input
          className='input4'
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className='label4'>Firm Image</label>
        <input
          className='input4'
          type="file"
          onChange={Imageupload}
          accept="image/*"
        />

        <button className='btn4' type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Addproduct;
