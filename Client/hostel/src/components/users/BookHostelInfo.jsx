import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BsPersonLinesFill, BsTelephone, BsEnvelope } from "react-icons/bs";

const BookHostelInfo = () => {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // Fetch rooms information
    axios
      .get(`http://localhost:3001/AddRooms/` + id)
      .then((result) => {
        setRooms(result.data);
      })
      .catch((err) => console.log(err));
  }, [id, refresh]);

  // Render the component
  return rooms ? (
    <main className="container">
      <h4>Hostel and Room Information</h4>
      <div
        className="Upper-Container bg-light mt-2"
        style={{ padding: "2%", border: "1px solid #dee2e6" }}
      >
        <div className="row border-bottom pb-2 mb-2 align-items-center">
          <div className="col-1 text-center">
            <BsPersonLinesFill className="icon" />
          </div>
          <div className="col">
            <p className="mb-0">Hostel Name: {rooms.hostelName} </p>
          </div>
        </div>
        <div className="row border-bottom pb-2 mb-2 align-items-center">
          <div className="col-1 text-center">
            <BsPersonLinesFill className="icon" />
          </div>
          <div className="col">
            <p className="mb-0">Location: {rooms.hostelLocation} </p>
          </div>
        </div>
        <div className="row border-bottom pb-2 mb-2 align-items-center">
          <div className="col-1 text-center">
            <BsPersonLinesFill className="icon" />
          </div>
          <div className="col">
            <p className="mb-0">Room No: {rooms.RoomNo} </p>
          </div>
        </div>
        <div className="row border-bottom pb-2 mb-2 align-items-center">
          <div className="col-1 text-center">
            <BsTelephone className="icon" />
          </div>
          <div className="col">
            <p className="mb-0">Seaters: {rooms.RoomBed}</p>
          </div>
        </div>
        <div className="row border-bottom pb-2 mb-2 align-items-center">
          <div className="col-1 text-center">
            <BsEnvelope className="icon" />
          </div>
          <div className="col">
            <p className="mb-0">Room Type: {rooms.RoomType} </p>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-1 text-center">
            <BsEnvelope className="icon" />
          </div>
          <div className="col">
            <p className="mb-0">Rent (Per Month): {rooms.RoomPrice} </p>
          </div>
        </div>
      </div>
      
    </main>
  ) : null; // Render null if userInfo is null
};

export default BookHostelInfo;
