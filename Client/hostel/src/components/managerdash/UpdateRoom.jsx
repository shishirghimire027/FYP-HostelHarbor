import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

import EditRoom from "./EditRoom";
import UpdateImage from "./UpdateImage";

function UpdateRoom() {
  const { id } = useParams();
  const [rooms, setRooms] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/AddRooms/${id}`)
      .then((result) => {
        console.log(result);
        setRooms(result.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (rooms === null) {
    return <div>Loading...</div>; // You can render a loading indicator
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="container mt-2">
            <h1 className="text-center mb-4">Update Room</h1>
            <div className="row justify-content-center">
              <div className="col-md-4 mb-4">
                <div className="bg-light p-3 border rounded">
                  <img
                    src={`http://localhost:3001/images/${rooms.image}`}
                    alt={`Room ${rooms.RoomNo}`}
                    className="img-fluid mb-3"
                    style={{ maxHeight: "200px" }}
                  />
                  <h5>Room No: {rooms.RoomNo}</h5>
                  <p>Seater: {rooms.Seater}</p>
                  <p>Available Beds: {rooms.RoomBed}</p>
                  <p>Room Type: {rooms.RoomType}</p>
                  <p>Price: {rooms.RoomPrice}</p>
                  <p>Description: {rooms.RoomDescription}</p>
                  <div className="column">
                    <button
                      className="btn btn-primary me-2"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#editCollapse`}
                      aria-expanded="false"
                      aria-controls={`editCollapse`}
                    >
                      Edit Room
                    </button>
                    <button
                      className="btn btn-primary"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#updateCollapse`}
                      aria-expanded="false"
                      aria-controls={`updateCollapse`}
                    >
                      Edit Images
                    </button>
                  </div>
                  <div className="collapse" id={`editCollapse`}>
                    <div className="card card-body bg-light text-dark fw-light mt-5">
                     <EditRoom />
                    </div>
                  </div>
                  <div className="collapse" id={`updateCollapse`}>
                    <div className="card card-body bg-light text-dark fw-light">
                      <UpdateImage />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateRoom;
