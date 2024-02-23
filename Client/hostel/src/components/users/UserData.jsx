import React, { useState, useEffect } from "react";
import axios from "axios";

const UserData = () => {
  // State to store user information
  const [userInfo, setUserInfo] = useState(null);

  // Effect hook to fetch user's information when the component mounts
  useEffect(() => {
    // Function to fetch user's information
    const fetchUserInfo = async () => {
      try {
        // Retrieve the token from localStorage or sessionStorage
        const token = localStorage.getItem("token"); // Adjust based on where you store the token
        console.log("Token:", token);

        // Make a GET request with the token included in the authorization header
        const response = await axios.get("http://localhost:3001/userInfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set the userInfo state with the fetched data
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    // Call the fetchUserInfo function
    fetchUserInfo();
  }, []);

  return (
    <div>
      <h2>User Information</h2>
      {userInfo ? (
        <div>
          <p>
            <strong>First Name:</strong> {userInfo.fname}
          </p>
          <p>
            <strong>Last Name:</strong> {userInfo.lname}
          </p>
          <p>
            <strong>Phone:</strong> {userInfo.phone}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserData;
