import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import PendingRequest from "./PendingRequest";
import ChatInterface from "./ChatInterface";

function UserHostel() {
  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`http://localhost:3001/ResidentLists`, config)
      .then((result) => {
        const userId = jwtDecode(token).id;
        const filteredUserHostel = result.data.filter(
          (room) => room.User_id === userId
        );
        setRes(filteredUserHostel);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        setError(err);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Show error message if there's an error
  }

  return res.length > 0 ? (
    <main className="container">
      <h4>User/Hostel Profile</h4>
      <div
        className="Upper-Container bg-light mt-2"
        style={{ padding: "2%", border: "1px solid #dee2e6" }}
      >
        {res.map((hostel, index) => (
          <div
            key={index}
            className="row border-bottom pb-2 mb-2 align-items-center"
          >
            <div className="col-1 text-center">
              {/* <BsPersonLinesFill className="icon" /> */}
            </div>
            <div className="col">
              <p className="mb-0">Hostel Name: {hostel.hostelName}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-box">
        <ChatInterface />
      </div>
    </main>
  ) : (
    <div>
      <PendingRequest />
    </div>
  );
}

export default UserHostel;
