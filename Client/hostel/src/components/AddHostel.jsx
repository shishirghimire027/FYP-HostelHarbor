import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";


// import Create from "../components/Create";

function AddHostel() {
  const [hostels, setHostels] = useState([]);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/AddHostels")
  //     .then((result) => setHostels(result.data))
  //     .catch((err) => console.log(err));
  // }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/AddHostels")
      .then((result) => setHostels(result.data))
      .catch((err) => console.log(err));
  }, [refresh]);

  // const handleDelete = (id) => {
  //   axios
  //     .delete("http://localhost:3001/Delete/" + id)
  //     .then((res) => {
  //       console.log(res);
  //       window.location.reload();
  //     })

  //     .catch((errr) => console.log(errr));
  // };
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/Delete/" + id)
      .then((res) => {
        console.log(res);
        setRefresh(!refresh);
      })
      .catch((errr) => console.log(errr));
  };
  const handleAcceptClick = async (hostelId) => {
    try {
       // Assuming you have an endpoint to mark the hostel as approved
       await axios.put(`http://localhost:3001/HostelList/${hostelId}`, { approved: true });
 
       // Fetch the approved hostel details
       const result = await axios.get(`http://localhost:3001/HostelList/${hostelId}`);
       const addedHostel = result.data;
 
       // Navigate to HostelList page and pass added hostel as state
       navigate("/HostelList", { state: { addedHostel } });
    } catch (error) {
       console.log(error);
    }
 };
 

  return (
    <div className="d-flex  justify-content-center align-items-center main-container">
      <div className="w-70 bg-white rounded p-3 ">
        <Link to="/Create" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Hostel Name</th>
              <th>Hostel Location</th>
              <th>Hostel Type</th>
              <th>Manager Name</th>
              <th>Manager Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hostels.map((addhostel) => {
              return (
                <tr key={addhostel._id}>
                  <td>{addhostel.Hostel_Name}</td>
                  <td>{addhostel.Hostel_Location}</td>
                  <td>{addhostel.Hostel_Type}</td>
                  <td>{addhostel.Manager_Name}</td>
                  <td>{addhostel.Manager_Contact}</td>
                  <td>
                    <Link
                      to={`/Update/${addhostel._id}`}
                      className="btn btn-success"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(addhostel._id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link
                      
                      className="btn btn-success"
                      onClick={() => handleAcceptClick(addhostel._id)}
                    >
                      Accept
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddHostel;
