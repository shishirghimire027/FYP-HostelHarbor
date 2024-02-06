import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AddHostel = ({ setTotalHostels }) => {
  const [hostels, setHostels] = useState([]);
  const [refresh, setRefresh] = useState(false);
  // const [selectedRow, setSelectedRow] = useState(null);

  // const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/HostelLists")
      .then((result) => {
        setHostels(result.data);
      })
      .catch((err) => console.log(err));
  }, [refresh, setTotalHostels]);



const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/Deletes/" + id)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          // Delete operation was successful, update the state
          setRefresh(!refresh);
        } else {
          // Delete operation failed, handle the error appropriately
          console.error("Delete operation failed");
        }
      })
      .catch((err) => console.log(err));
  };
  


  return (
    <div className="d-flex justify-content-center align-items-center main-container ">
      <div className="w-90  bg-white rounded p-3">
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
            {hostels.map((addhostel) => (
              <tr key={addhostel._id}>
                <td>{addhostel.Hostel_Name}</td>
                <td>{addhostel.Hostel_Location}</td>
                <td>{addhostel.Hostel_Type}</td>
                <td>{addhostel.Manager_Name}</td>
                <td>{addhostel.Manager_Contact}</td>
                <td>
                  <Link
                    to={`/UpdateHostelList/${addhostel._id}`}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddHostel;
