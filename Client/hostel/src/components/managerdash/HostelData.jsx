import React, { useState, useEffect } from "react";
import axios from "axios";


const HostelData = () => {
  // State to store manager's information
  const [managerInfo, setManagerInfo] = useState(null);

  // Effect hook to fetch manager's information when the component mounts
  useEffect(() => {
    // Function to fetch manager's information
    const fetchManagerInfo = async () => {
      try {
        // Retrieve the token from localStorage or sessionStorage
        const token = localStorage.getItem("token"); // Adjust based on where you store the token
        console.log("Token:", token);
        

        // Make a GET request with the token included in the authorization header
        const response = await axios.get("http://localhost:3001/managerInfo", {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
        });

        // Set the managerInfo state with the fetched data
        setManagerInfo(response.data);
      } catch (error) {
        console.error("Error fetching manager information:", error);

      }
    };

    // Call the fetchManagerInfo function
    fetchManagerInfo();
  }, []);
  

  return (
    <div>
      <h2>Hostel Information</h2>
      {managerInfo ? (
        <div>
         
          <p>
            <strong>ID:</strong> {managerInfo._id}
          </p>

          <p>
            <strong>Hostel Name:</strong> {managerInfo.Hostel_Name}
          </p>
          <p>
            <strong>Location:</strong> {managerInfo.Hostel_Location}
          </p>
          <p>
            <strong>Type:</strong> {managerInfo.Hostel_Type}
          </p>
          <p>
            <strong>Manager Name:</strong> {managerInfo.Manager_Name}
          </p>
          <p>
            <strong>Manager Contact:</strong> {managerInfo.Manager_Contact}
          </p>
          <p>
            <strong>Email:</strong> {managerInfo.email}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HostelData;
