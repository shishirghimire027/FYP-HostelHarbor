import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsPersonLinesFill,BsTelephone, BsEnvelope  } from "react-icons/bs";

const BookUserInfo = () => {
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

  // Render the component only when userInfo is not null
  return userInfo ? (
<main className="container">
  <h4>Customer Information</h4>
      <div
        className="Upper-Container bg-light mt-2"
        style={{ padding: "2%", border: "1px solid #dee2e6" }}
      >
        <div className="row border-bottom pb-2 mb-2 align-items-center">
          <div className="col-1 text-center">
            <BsPersonLinesFill className="icon" />
          </div>
          <div className="col">
            <p className="mb-0">Book to: {userInfo.fname} {userInfo.lname}</p>
          </div>
        </div>
        <div className="row border-bottom pb-2 mb-2 align-items-center">
          <div className="col-1 text-center">
            <BsTelephone className="icon" />
          </div>
          <div className="col">
            <p className="mb-0">Contact Number: {userInfo.phone}</p>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-1 text-center">
            <BsEnvelope className="icon" />
          </div>
          <div className="col">
            <p className="mb-0">Email: {userInfo.email}</p>
          </div>
        </div>
      </div>
    </main>

  ) : null; // Render null if userInfo is null
};

export default BookUserInfo;
