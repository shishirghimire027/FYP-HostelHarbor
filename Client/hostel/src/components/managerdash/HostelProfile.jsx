import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HostelProfile.css";

const HostelProfile = () => {
  // State to store manager's information
  const [managerInfo, setManagerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect hook to fetch manager's information when the component mounts
  useEffect(() => {
    // Function to fetch manager's information
    const fetchManagerInfo = async () => {
      try {
        // Retrieve the token from localStorage or sessionStorage
        const token = localStorage.getItem("token"); // Adjust based on where you store the token

        // Make a GET request with the token included in the authorization header
        const response = await axios.get("http://localhost:3001/managerInfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set the managerInfo state with the fetched data
        setManagerInfo(response.data);
        setLoading(false); // Set loading to false after successful data fetch
      } catch (error) {
        console.error("Error fetching manager information:", error);
        setError(error.message); // Set error state if there's an error
        setLoading(false); // Set loading to false on error
      }
    };

    // Call the fetchManagerInfo function
    fetchManagerInfo();
  }, []);

  // Display loading state while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the component with fetched managerInfo data
  return (
    <div className="banners">
      <div className="img-banner">
        {/* Display the uploaded image if available */}
        {managerInfo && managerInfo.image ? (
  <img
  className="hostel-img"
  src={`http://localhost:3001/images/hostels/${managerInfo.image}`}
  alt={`${managerInfo.Hostel_Name}`}
  onError={(e) => console.log("Error loading image:", e, e.nativeEvent)}
/>

) : (
  <div>Error loading image</div>
)}
      </div>
      <table className="tablez text-white">
        <tbody>
          <tr>
            <td>Hostel Name</td>
            <td>{managerInfo.Hostel_Name}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{managerInfo.Hostel_Location}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{managerInfo.Hostel_Type}</td>
          </tr>
        </tbody>
      </table>

      <table className="tablez text-white">
        <tbody>
          <tr>
            <td>Manager Name</td>
            <td>{managerInfo.Manager_Name}</td>
          </tr>
          <tr>
            <td>Contact</td>
            <td>{managerInfo.Manager_Contact}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{managerInfo.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HostelProfile;
