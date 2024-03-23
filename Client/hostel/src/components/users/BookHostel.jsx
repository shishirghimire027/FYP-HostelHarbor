import React, { useState, useEffect } from "react";
import BookHostelInfo from "./BookHostelInfo";
import BookUserInfo from "./BookUserInfo";
import BookRoomInfo from "./BookRoomInfo";
import Navbar from "./Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";

function BookHostel() {
  const { id } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [roomBedOptions, setRoomBedOptions] = useState([]);
  const [selectedRoomBed, setSelectedRoomBed] = useState("");
  const [checkInDate, setCheckInDate] = useState("");

  useEffect(() => {
    fetchRoomBedOptions();
  }, []);

  const fetchRoomBedOptions = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/AddRooms/${id}`);
      const roomBedData = response.data;
      const options = Array.from(
        { length: roomBedData.RoomBed },
        (_, index) => ({
          value: index + 1,
          label: index + 1,
        })
      );
      setRoomBedOptions(options);
    } catch (error) {
      console.error("Error fetching room bed options:", error);
    }
  };

  const handleConfirmClick = async () => {
    // Get user information from BookUserInfo component
    const userInfo = await getUserInfo();

    // Get hostel information from BookHostelInfo component
    const hostelInfo = await getHostelInfo();

    // Prepare data to post to BookingRequest collection
    const requestData = {
      userInfo,
      hostelInfo,
      id,
      selectedRoomBed,
      checkInDate,
      // You can include any additional data you want to post
    };

    // Make a POST request to save the data in BookingRequest collection
    try {
      const token = localStorage.getItem("token"); // Adjust based on where you store the token

      const response = await axios.post(
        "http://localhost:3001/bookingRequest",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Booking request submitted successfully:", response.data);
      setShowAlert(true);
    } catch (error) {
      console.error("Error submitting booking request:", error);
    }
  };

  // Function to get user information from BookUserInfo component
  const getUserInfo = async () => {
    try {
      const token = localStorage.getItem("token"); // Adjust based on where you store the token
      const response = await axios.get("http://localhost:3001/userInfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user information:", error);
      return null;
    }
  };

  // Function to get hostel information from BookHostelInfo component
  const getHostelInfo = async () => {
    try {
      // Make a GET request to fetch hostel information
      const response = await axios.get(`http://localhost:3001/AddRooms/${id}`);

      // Assuming the server returns hostel information in response.data
      return response.data;
    } catch (error) {
      console.error("Error fetching hostel information:", error);
      return null;
    }
  };

  return (
    <div>
      <Navbar />
      {showAlert && (
        <div className="alert alert-success alert-dismissible" role="alert">
          Congratulations! You have successfully requested Room Booking. You
          will be notified after confirmation from the Hostel Manager. You can
          check the booking status or either Cancel it from Your Hostel Section.
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAlert(false)}
            aria-label="Close"
          ></button>
        </div>
      )}
      <BookUserInfo />
      <BookHostelInfo />
      <BookRoomInfo />
      <div
        className="form-group mt-3"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label htmlFor="roomBedSelect" style={{ marginRight: "10px" }}>
          Bed Quantity:
        </label>
        <select
          id="roomBedSelect"
          className="form-control"
          value={selectedRoomBed}
          style={{ width: "12%" }}
          onChange={(e) => setSelectedRoomBed(e.target.value)}
        >
          <option value="">Select Bed Quantity</option>
          {roomBedOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div
        className="form-group mt-3"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label htmlFor="checkInDateInput" style={{ marginRight: "10px" }}>
          Check-In Date:
        </label>
        <input
          type="date"
          id="checkInDateInput"
          className="form-control"
          style={{ width: "12%" }}
          min={new Date().toISOString().split("T")[0]}
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-success"
          onClick={handleConfirmClick}
          title="Confirm Booking"
          disabled={!selectedRoomBed}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default BookHostel;
