import React, { useState } from "react";
import "../../pages/HostelReg.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateRoom() {
  const [RoomBed, setRoomBed] = useState();
  const [RoomType, setRoomType] = useState();
  const [RoomDescription, setRoomDescription] = useState();
  const [RoomPrice, setRoomPrice] = useState();
  const [RoomNo, setRoomNo] = useState();
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/CreateRoom", {
        RoomNo,
        RoomBed,
        RoomType,
        RoomDescription,
        RoomPrice,
      })
      .then((result) => {
        console.log(result);
        navigate("/ManageRoom"); // Providing the absolute path
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="bg-white rounded p-3">
        <form onSubmit={Submit}>
          <h2 className="mb-4">Add Rooms</h2>
          <div className="mb-3">
            <label htmlFor="RoomNo" className="form-label">
              Room Number
            </label>
            <input
              type="number"
              className="form-control"
              id="RoomNo"
              aria-describedby="RoomNo"
              onChange={(e) => setRoomNo(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="RoomBed" className="form-label">
              Total Beds
            </label>
            <select
                className="form-select"
                aria-label="Hostel Location"
                onChange={(e) => setRoomBed(e.target.value)}
              >
                <option defaultValue>Total Bed</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
          </div>
          <div className="row mb-5">
           
            <div className="col-md-6">
              <label htmlFor="Room" className="form-label">
                Room Type
              </label>
              <select
                className="form-select"
                aria-label="Romm Type"
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option defaultValue>Select Room Type</option>
                <option>Attached</option>
                <option>Non-Attached</option>
              </select>
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="Price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="Price"
              aria-describedby="Price"
              onChange={(e) => setRoomPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Description" className="form-label">
              Room Description
            </label>
            <input
              type="text"
              className="form-control"
              id="Description"
              aria-describedby="Description"
              onChange={(e) => setRoomDescription(e.target.value)}
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

export default CreateRoom;
