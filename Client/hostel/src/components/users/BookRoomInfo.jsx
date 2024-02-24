import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { BsPersonLinesFill, BsTelephone, BsEnvelope } from "react-icons/bs";

function BookRoomInfo() {
    const { id } = useParams();
    // const [rooms, setRooms] = useState([]);
    const [hostelInfo, setHostelInfo] = useState(null);
    const [refresh, setRefresh] = useState(false);
  
    useEffect(() => {
      axios
        .get("http://localhost:3001/HostelLists/" + id)
        .then((result) => {
          setHostelInfo(result.data);
        })
        .catch((err) => console.log(err));

    }, [id, refresh]);
  return hostelInfo ? (
    <main className="container">
      <h4>Hostel Information</h4>
          <div
            className="Upper-Container bg-light mt-2"
            style={{ padding: "2%", border: "1px solid #dee2e6" }}
          >
            <div className="row border-bottom pb-2 mb-2 align-items-center">
              <div className="col-1 text-center">
                <BsPersonLinesFill className="icon" />
              </div>
              <div className="col">
                <p className="mb-0">Hostel Name: {hostelInfo.Hostel_Name} </p>
              </div>
            </div>
        
          </div>
        </main>
    
      ) : null; // Render null if userInfo is null
    };
  

export default BookRoomInfo
