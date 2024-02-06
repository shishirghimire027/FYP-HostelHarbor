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
      .get("http://localhost:3001/AddHostels")
      .then((result) => {
        setHostels(result.data);
      })
      .catch((err) => console.log(err));
  }, [refresh, setTotalHostels]);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/Delete/" + id)
      .then((res) => {
        console.log(res);
        setRefresh(!refresh);
      })
      .catch((errr) => console.log(errr));
  };

  // const addToHostelLists = (selectedRow) => {
  //   if (selectedRow) {
  //     axios
  //       .post("http://localhost:3001/HostelLists", selectedRow)
  //       .then((res) => {
  //         console.log(res);

  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     console.log("No row selected");
  //   }
  // };
  const addToHostelLists = (selectedRow) => {
    if (selectedRow) {
      axios
        .post("http://localhost:3001/HostelLists", selectedRow)
        .then((res) => {
          console.log(res);
          // Remove the sent row from the hostels array
          setHostels(
            hostels.filter((hostel) => hostel._id !== selectedRow._id)
          );
          // Delete the sent row from the AddHostel collection
          axios
            .delete("http://localhost:3001/Delete/" + selectedRow._id)
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
            {hostels.map((addhostel) => (
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
                  <button
                    className="btn btn-success"
                    onClick={() => addToHostelLists(addhostel)} // Pass addhostel directly
                  >
                    Accept
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
