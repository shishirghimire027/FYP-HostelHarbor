import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ViewResident = () => {
  const [Resident, setResident] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("http://localhost:3001/ResidentLists", config)
      .then((result) => {
        // const userId = jwt.decode(token).id; // Decode the token to get the user ID
        const userId = jwtDecode(token).id;

        const filteredResident = result.data.filter(
          (res) => res.HostelID === userId
        ); // Filter resident(res) by matching hostelID with user ID
        setResident(filteredResident);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/DeleteResident/" + id)
      .then((res) => {
        console.log(res);
        setRefresh(!refresh);
      })
      .catch((errr) => console.log(errr));
  };

  return (
    <div className="d-flex justify-content-center align-items-center main-container ">
      <div className="w-90 bg-white rounded p-3">
        <Link to="/CreateResident" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Room No</th>
              <th>Name</th>
              <th>Contact</th>
              <th>email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Resident.map((addresident) => (
              <tr key={addresident._id}>
                <td>{addresident.roomNo}</td>
                <td>{addresident.userName}</td>
                <td>{addresident.userPhone}</td>
                <td>{addresident.userEmail}</td>
                <td>
                  <Link
                    to={`/UpdateResident/${addresident._id}`}
                    className="btn btn-success"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDelete(addresident._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewResident;
