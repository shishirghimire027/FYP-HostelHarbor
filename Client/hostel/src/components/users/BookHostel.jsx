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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const checkBookingStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3001/bookingStatus/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setIsButtonDisabled(true); // Disable the button if booking data is present
        }
      } catch (error) {
        console.error("Error checking booking status:", error);
      }
    };

    // Check booking status when the component mounts
    checkBookingStatus();

    // Check booking status from local storage
    const bookingStatusFromLocalStorage = localStorage.getItem(`bookingStatus_${id}`);
    if (bookingStatusFromLocalStorage === 'pending') {
      setIsButtonDisabled(true);
    }
  }, [id]);

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
      setIsButtonDisabled(true); // Disable the button after successful booking
      // Store the booking status in local storage
      localStorage.setItem(`bookingStatus_${id}`, 'pending');
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
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-success"
          onClick={handleConfirmClick}
          disabled={isButtonDisabled}
          title={isButtonDisabled ? "Booking already requested" : "Confirm Booking"}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default BookHostel;
