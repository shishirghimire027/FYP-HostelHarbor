import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function ManageBooking() {
  const [booking, setBooking] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("http://localhost:3001/bookingRequest", config) // Corrected axios syntax
      .then((result) => {
        const userId = jwtDecode(token).id; // Decode the token to get the user ID

        const filteredRooms = result.data.filter(
          (addbooking) => addbooking.HostelID === userId
        ); // Filter rooms by matching hostel with user ID

        setBooking(filteredRooms);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/RejectBooking/" + id)
      .then((res) => {
        console.log(res);
        setRefresh(!refresh);
      })
      .catch((errr) => console.log(errr));
  };

  // const addToResidentLists = (selectedRow) => {
  //   if (selectedRow) {
  //     axios
  //       .post("http://localhost:3001/ResidentLists", selectedRow)
  //       .then((res) => {
  //         console.log(res);
  //         // Remove the sent row from the booking array
  //         setBooking(booking.filter((book) => book._id !== selectedRow._id));
  //         // Delete the sent row from the AddHostel collection
  //         axios
  //           .delete("http://localhost:3001/RejectBooking/" + selectedRow._id)
  //           .then((deleteRes) => {
  //             console.log(deleteRes);
  //             // Refresh the hostels array after deletion
  //             setRefresh(!refresh);
  //           })
  //           .catch((deleteErr) => console.log(deleteErr));
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     console.log("No row selected");
  //   }
  // };
  const addToResidentLists = (selectedRow) => {
    if (selectedRow) {
      axios
        .post("http://localhost:3001/ResidentLists", selectedRow)
        .then((res) => {
          console.log(res);
          // Remove the sent row from the booking array
          setBooking(booking.filter((book) => book._id !== selectedRow._id));
          
          // Delete all booking requests of the particular user
          const userId = selectedRow.User_id; // Assuming User_id is the field that stores the user's ID
          axios
            .delete(`http://localhost:3001/bookingRequest/${userId}`)
            .then((deleteRes) => {
              console.log(deleteRes);
              // Refresh the hostels array after deletion
              setRefresh(!refresh);
            })
            .catch((deleteErr) => console.log(deleteErr));
        })
        .catch((err) => console.log(err));
    } else {
      console.log("No row selected");
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center main-container ">
      <div className="w-90 bg-white rounded p-3">
        <table className="table">
          <thead>
            <tr>
            <th>Room No. (Req)</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              
              <th>Requested Beds</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((addbooking) => (
              <tr key={addbooking._id}>
                <td>{addbooking.roomNo}</td>
                <td>{addbooking.userName}</td>
                <td>{addbooking.userPhone}</td>
                <td>{addbooking.userEmail}</td>
                
                <td>{addbooking.selectedRoomBedData}</td>

                <td>
                  {/* <Link
                  to={`/Update/${addbooking._id}`}
                  className="btn btn-success"
                >
                  Edit
                </Link> */}
                  <button
                    className="btn btn-success"
                    onClick={() => addToResidentLists(addbooking)} // Pass addhostel directly
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDelete(addbooking._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageBooking;
