import React, { useState } from 'react';
import './AddFirm.css';
import { API_URL } from '../../Data/api';

const AddFirm = () => {
  const [firmName, setfirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const Categorychange = (event) => {
    const value = event.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const Regionchange = (event) => {
    const value = event.target.value;
    setRegion((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const Imageupload = (event) => {
    const selectImage = event.target.files[0];
    setFile(selectImage);
  };

  const FirmSubmit = async (e) => {
    e.preventDefault();

    if (!firmName.trim() || !area.trim() || category.length === 0 || region.length === 0 || !file) {
      alert("Please fill all required fields including image");
      return;
    }

    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        console.error("User not authenticated");
        alert("You are not logged in.");
        return;
      }

      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', file);

      category.forEach((value) => formData.append('category', value));
      region.forEach((value) => formData.append('region', value));

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${loginToken}`,
        },
        body: formData
      });

      const text = await response.text();

      try {
        const data = JSON.parse(text);

        if (response.ok) {
          console.log("Firm added:", data);
          localStorage.setItem('firmId', data.firmId);

          setfirmName("");
          setArea("");
          setCategory([]);
          setRegion([]);
          setOffer("");
          setFile(null);

          alert("Firm added successfully");
        } else if (data.message === "vendor can have only one firm") {
          alert("Firm exists. Only 1 firm can be added.");
        } else {
          alert(data.message || "Failed to add firm.");
        }

      } catch (jsonErr) {
        console.error("Non-JSON response:", text);
        alert("Something went wrong. Please try again.");
      }

    } catch (error) {
      console.error("Failed to add firm:", error);
      alert("Error while submitting the firm. Please check your network or try again.");
    }
  };

  return (
    <div className='add-firm'><br /><br /><br /><br />
      <form className='form3' onSubmit={FirmSubmit}>
        <label className='label3'>Firm Name</label>
        <input className='input3' type="text" value={firmName} onChange={(e) => setfirmName(e.target.value)} />

        <label className='label3'>Area</label>
        <input className='input3' type="text" value={area} onChange={(e) => setArea(e.target.value)} />

        <div className="check-box">
          <label className='label3'>Category</label>
          <div className="category-row">
            {['veg', 'non-veg'].map((item) => (
              <div className="checkcontainer" key={item}>
                <label className='labelbox1'>{item}</label>
                <input className='inputbox1' type="checkbox" value={item} checked={category.includes(item)} onChange={Categorychange} />
              </div>
            ))}
          </div>
        </div>

        <div className="check-box">
          <label className='label3'>Region</label>
          <div className="region-grid">
            {['south-indian', 'north-indian', 'chinese', 'bakery'].map((item) => (
              <div className="checkcontainer" key={item}>
                <label className='labelbox1'>{item}</label>
                <input className='inputbox1' type="checkbox" value={item} checked={region.includes(item)} onChange={Regionchange} />
              </div>
            ))}
          </div>
        </div>

        <label className='label3'>Offer</label>
        <input className='input3' type="text" value={offer} onChange={(e) => setOffer(e.target.value)} />

        <label className='label3'>Firm Image</label>
        <input className='input3' type="file" accept="image/*" onChange={Imageupload} />

        <button type='submit' className='btn3'>Submit</button>
      </form>
    </div>
  );
};

export default AddFirm;
