import React, { useEffect, useState } from 'react';
import { API_URL } from '../../Data/api';
import './UserDetails.css';

const UserDetails = () => {
  const [vendors, setVendors] = useState([]);

  const fetchVendorDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`);
      const data = await response.json();
      setVendors(data.vendors || []);
    } catch (error) {
      console.error("Failed to fetch vendors", error);
    }
  };

  useEffect(() => {
    fetchVendorDetails();
  }, []);

  return (
    <div className="user-details-container">
      <h2>User Activity Details</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Registered At</th>
            
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id}>
              <td>{vendor.username}</td>
              <td>{vendor.email}</td>
              <td>{vendor.registrationTime ? new Date(vendor.registrationTime).toLocaleString() : "N/A"}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
