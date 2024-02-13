import React, { useState, useEffect } from "react";
import "../../pages/Manager.css";
import axios from "axios";

function ManageRoom() {
  const [rooms, setRooms] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/AddRooms")
      .then((result) => {
        setRooms(result.data);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  // Function to generate background color for cards
  const getCardColor = (index) => {
    const colors = ["#2962ff", "#ff6d00", "#2e7d32", "#d50000"];
    return colors[index % colors.length];
  };

  return (
    <main className="main-container">
      <div className="main-cards">
        {/* Render room cards */}
        {rooms.map((room, index) => (
          <div className="card" key={index} style={{ backgroundColor: getCardColor(index) }}>
            <div className="card-inner row">
              <h6>Room No: {room.RoomNo}</h6>
              <h6>Seater: {room.RoomBed}</h6>
              <h6>Room Type: {room.RoomType}</h6>
              <h6>Price: {room.RoomPrice}</h6>
    
             
              <button className="btn btn-success">Edit Room</button>
              <button className="btn btn-danger">Delete Room</button>
            </div>
          </div>
        ))}
      
        {/* Button to add more rooms */}
        <div className="card" style={{ backgroundColor: getCardColor(rooms.length) }}>
          <div className="card-inner">
            <a href="/CreateRoom">
              <button className="addroombtn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="fill"
                  className="bi bi-plus-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
              </button>
            </a>
          </div>
          <h3>Add Rooms</h3>
        </div>
      </div>
    </main>
  );
}

export default ManageRoom;
