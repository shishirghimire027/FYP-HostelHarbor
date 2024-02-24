import React, { useState } from "react";
import BookHostelInfo from "./BookHostelInfo";
import BookUserInfo from "./BookUserInfo";
import BookRoomInfo from "./BookRoomInfo";
import Navbar from "./Navbar";
import axios from "axios";

function BookHostel() {
  const [showAlert, setShowAlert] = useState(false);

  const handleConfirmClick = async () => {
    // Get user information from BookUserInfo component
    const userInfo = await getUserInfo();

    // Get hostel information from BookHostelInfo component
    const hostelInfo = await getHostelInfo();

    // Prepare data to post to BookingRequest collection
    const requestData = {
      userInfo,
      hostelInfo,
      // You can include any additional data you want to post
    };

    // Make a POST request to save the data in BookingRequest collection
    try {
      const response = await axios.post("http://localhost:3001/bookingRequest", requestData);
      console.log("Booking request submitted successfully:", response.data);
      setShowAlert(true);
    } catch (error) {
      console.error("Error submitting booking request:", error);
    }
  };

  // Function to get user information from BookUserInfo component
  const getUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:3001/userInfo");
      return response.data;
    } catch (error) {
      console.error("Error fetching user information:", error);
      return null;
    }
  };

  // Function to get hostel information from BookHostelInfo component
  const getHostelInfo = async () => {
    try {
      // You need to implement a way to get hostel information based on your application logic
      // For example, you can pass hostel ID as props to BookHostelInfo component and fetch hostel information using that ID
      // Here, I'm returning hardcoded data for demonstration purposes
      return {
        hostelName: "Sample Hostel",
        hostelLocation: "Sample Location",
        // Include other hostel information as needed
      };
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
          Congratulations! You have successfully requested Room Booking. You will be notified after confirmation from the Hostel Manager.
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
        <button className="btn btn-success" onClick={handleConfirmClick}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default BookHostel;
