import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Home() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    // If token is not present, redirect to login
    if (!token) {
      navigate("/Login");
      return;
    }

    // Decode the token to get user information
    const decodedToken = jwtDecode(token);

    // Check if the role is 'user'
    if (decodedToken.role !== "user") {
      // Redirect to the login page if the user is not a user
      navigate("/Admin");
      return;
    }

    // Fetch data from the protected route
    axios
      .get("http://localhost:3001/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        // Redirect to the login page if there is an authorization error
        navigate("/Login");
      });
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to home page</h1>
    </div>
  );
}

export default Home;
