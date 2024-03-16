import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateResident() {
  const [roomNo, setRoomNo] = useState();
  const [roomType, setRoomType] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setuserEmail] = useState();
  const [userPhone, setUserPhone] = useState();
  const [managerInfo, setManagerInfo] = useState({});
  const [hostelName, setHostelName] = useState("");
 
  const [hostelLocation, setHostelLocation] = useState();
  const [HostelID, setHostelID] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch manager's information
    const fetchManagerInfo = async () => {
      try {
        // Retrieve the token from localStorage or sessionStorage
        const token = localStorage.getItem("token"); // Adjust based on where you store the token
        console.log("Token:", token);

        // Make a GET request with the token included in the authorization header
        const response = await axios.get("http://localhost:3001/managerInfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set the managerInfo state with the fetched data
        setManagerInfo(response.data);

        // Set the relevant state values from managerInfo
        setHostelID(response.data._id);
        setHostelName(response.data.Hostel_Name); // Set Hostel_Name state
        
        setHostelLocation(response.data.Hostel_Location);
      } catch (error) {
        console.error("Error fetching manager information:", error);
      }
    };

    // Call the fetchManagerInfo function
    fetchManagerInfo();
  }, []);

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/CreateResident", {
        HostelID,
        User_id: null,
        roomBed: null,
        roomDescription: null,
        roomPrice: null,
        selectedRoomBedData: null,
        hostelName,
        hostelLocation,
        roomNo: null,
        roomType,
        userName,
        userEmail,
        userPhone,
      })
      .then((result) => {
        console.log(result);
        navigate("/ManagerViewHostelDetail"); // Providing the absolute path
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="bg-white rounded p-3">
        <form onSubmit={Submit}>
          <h2 className="mb-4">Add a Resident</h2>
          <div className="mb-3">
            <label htmlFor="HostelName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="HostelName"
              aria-describedby="HostelName"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="row mb-5">
            <div className="col-md-6">
              <label htmlFor="RoomType" className="form-label">
                Room Type
              </label>
              <select
                className="form-select"
                aria-label="Hostel Type"
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option defaultValue>Select Room Type</option>
                <option>Attached</option>
                <option>Non-Attached</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                aria-describedby="email"
                onChange={(e) => setuserEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="Contact" className="form-label">
              Contact
            </label>
            <input
              type="tel"
              className="form-control"
              id="Contact"
              aria-describedby="Contact"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateResident;
