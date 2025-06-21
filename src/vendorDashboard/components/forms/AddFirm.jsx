import React, { useState } from 'react';
import { API_URL } from '../../Data/api';
import { ThreeCircles } from 'react-loader-spinner';
import './AddFirm.css'; // Make sure to import the CSS

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        console.error("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', file);

      category.forEach(value => formData.append('category', value));
      region.forEach(value => formData.append('region', value));

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: {
          'token': `${loginToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
        alert("Firm added Successfully");

        localStorage.setItem('firmId', data.firmId);
        localStorage.setItem('firmName', data.vendorFirmName);
        window.location.reload();
      } else if (data.message === "vendor can have only one firm") {
        alert("Firm Exists 🥗. Only 1 firm can be added");
      } else {
        alert("Failed to add Firm");
      }
    } catch (error) {
      console.error("Failed to add Firm", error);
      alert("Failed to add Firm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="firmSection">
      {loading ? (
        <div className="loaderSection">
          <ThreeCircles visible={loading} height={100} width={100} color="#4fa94d" />
          <p>Adding firm... please wait</p>
        </div>
      ) : (
        <form className="addFirmForm" onSubmit={handleFirmSubmit}>
          <h3 className="addFirmTitle">Add Firm</h3>

          <label className="addFirmLabel">Firm Name</label>
          <input
            className="addFirmInput"
            type="text"
            name="firmName"
            value={firmName}
            onChange={(e) => setFirmName(e.target.value)}
          />

          <label className="addFirmLabel">Area</label>
          <input
            className="addFirmInput"
            type="text"
            name="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />

          <div className="checkInp">
            <label className="addFirmLabel">Category</label>
            <div className="inputsContainer">
              <div className="checboxContainer">
                <label>Veg</label>
                <input
                  type="checkbox"
                  value="veg"
                  checked={category.includes("veg")}
                  onChange={handleCategoryChange}
                />
              </div>
              <div className="checboxContainer">
                <label>Non-Veg</label>
                <input
                  type="checkbox"
                  value="non-veg"
                  checked={category.includes("non-veg")}
                  onChange={handleCategoryChange}
                />
              </div>
            </div>
          </div>

          <label className="addFirmLabel">Offer</label>
          <input
            className="addFirmInput"
            type="text"
            name="offer"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
          />

          <div className="checkInp">
            <label className="addFirmLabel">Region</label>
            <div className="inputsContainer">
              <div className="regBoxContainer">
                <label>South Indian</label>
                <input
                  type="checkbox"
                  value="south-indian"
                  checked={region.includes("south-indian")}
                  onChange={handleRegionChange}
                />
              </div>
              <div className="regBoxContainer">
                <label>North Indian</label>
                <input
                  type="checkbox"
                  value="north-indian"
                  checked={region.includes("north-indian")}
                  onChange={handleRegionChange}
                />
              </div>
              <div className="regBoxContainer">
                <label>Chinese</label>
                <input
                  type="checkbox"
                  value="chinese"
                  checked={region.includes("chinese")}
                  onChange={handleRegionChange}
                />
              </div>
              <div className="regBoxContainer">
                <label>Bakery</label>
                <input
                  type="checkbox"
                  value="bakery"
                  checked={region.includes("bakery")}
                  onChange={handleRegionChange}
                />
              </div>
            </div>
          </div>

          <label className="addFirmLabel">Firm Image</label>
          <input className="addFirmFile" type="file" onChange={handleImageUpload} />

          <button className="addFirmButton" type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default AddFirm;
