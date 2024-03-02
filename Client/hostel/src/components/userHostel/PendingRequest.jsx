import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function PendingRequest() {
  const [bookings, setBookings] = useState([]); // Changed to an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`http://localhost:3001/bookingRequest`, config)
      .then((result) => {
        const userId = jwtDecode(token).id;
        const filteredUserBookings = result.data.filter(
          (booking) => booking.User_id === userId
        );
        setBookings(filteredUserBookings); // Changed to setBookings
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [refresh]); // Added refresh as a dependency

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/RejectBooking/" + id)
      .then((res) => {
        console.log(res);
        setRefresh(!refresh);
        window.location.reload(); // Refresh the page after deletion
      })
      .catch((errr) => console.log(errr));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return bookings.length > 0 ? (
    <main className="container">
      <h4>Booking Information</h4>
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="Upper-Container bg-light mt-2"
          style={{ padding: "2%", border: "1px solid #dee2e6" }}
        >
          <div className="row border-bottom pb-2 mb-2 align-items-center">
            <div className="col-1 text-center">
              {/* <BsPersonLinesFill className="icon" /> */}
            </div>
            <div className="col">
              <p className="mb-0">Hostel Name: {booking.hostelName}</p>
            </div>
          </div>
          <div className="row border-bottom pb-2 mb-2 align-items-center">
            <div className="col-1 text-center">
              {/* <BsPersonLinesFill className="icon" /> */}
            </div>
            <div className="col">
              <p className="mb-0">Location: {booking.hostelLocation}</p>
            </div>
          </div>
          
          <div className="row border-bottom pb-2 mb-2 align-items-center">
            <div className="col-1 text-center">
              {/* <BsPersonLinesFill className="icon" /> */}
            </div>
            <div className="col">
              <p className="mb-0">Room No: {booking.roomNo}</p>
            </div>
          </div>
          <div className="row border-bottom pb-2 mb-2 align-items-center">
            <div className="col-1 text-center">
              {/* <BsPersonLinesFill className="icon" /> */}
            </div>
            <div className="col">
              <p className="mb-0">Rent (Montly): {booking.roomPrice}</p>
            </div>
          </div>
          {/* Render other booking information similarly */}
          <div className="row border-bottom pb-2 mb-2 align-items-center">
            <div className="col-1 text-center">
              {/* <BsPersonLinesFill className="icon" /> */}
            </div>
            <div className="col">
              <p className="mb-0" style={{ color: "red" }}>
                Status: {booking.status}
              </p>
            </div>
          </div>
          <div className="row border-bottom pb-2 mb-2 align-items-center">
            <div className="col-1 text-center">
              {/* <BsPersonLinesFill className="icon" /> */}
            </div>
            <div className="col">
              <p className="mb-0" style={{ color: "red" }}>
                <button
                  className="btn btn-danger"
                  onClick={(e) => handleDelete(booking._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel Request
                </button>
              </p>
            </div>
          </div>
        </div>
      ))}
    </main>
  ) : (
    <div>No hostel bookings found.</div>
  );
}

export default PendingRequest;
