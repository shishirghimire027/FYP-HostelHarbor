import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';



function UpdateResident() {
  const {id} = useParams()
  const [roomNo, setRoomNo] = useState();
  const [roomType, setRoomType] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setuserEmail] = useState();
  const [userPhone, setUserPhone] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/ResidentLists/"+id)
      .then((result) => {console.log(result)
        setRoomNo(result.data.roomNo)
        setRoomType(result.data.roomType)
        setUserName(result.data.userName)
        setuserEmail(result.data.userEmail)
        setUserPhone(result.data.userPhone)
      
      })
      .catch((err) => console.log(err));
  }, [id]);


  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/UpdateResident/"+id, {
        roomNo,
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
      <form onSubmit={Update}>
        <h2 className="mb-4">Upadte Resident Details</h2>
        <div className="mb-3">
          <label htmlFor="HostelName" className="form-label">
          RoomNO
          </label>
          <input
            type="text"
            className="form-control"
            id="RoomNO"
            aria-describedby="RoomNO"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
          />
        </div>
        <div className="row mb-5">
          <div className="col-md-6">
            <label htmlFor="Location" className="form-label">
              Name
            </label>
            <input
            type="text"
            className="form-control"
            id="Name"
            aria-describedby="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
           
          </div>
          <div className="col-md-6">
            <label htmlFor="RoomType" className="form-label">
              Room Type
            </label>
            <select className="form-select" aria-label="Hostel Type" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
              <option defaultValue>Select Room Type</option>
              <option>Attached</option>
              <option>Non-Attached</option>
            </select>
          </div>
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
            value={userEmail}
            onChange={(e) => setuserEmail(e.target.value)}
          />
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
          Update
        </button>
      </form>
    </div>
  </div>
  )
}

export default  UpdateResident;
