import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./VisitHostel.css";
import Navbar from "./Navbar";

import {
  BsFillPersonLinesFill,
  BsFillGeoAltFill,
  BsHousesFill,
} from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";

function VisitHostel() {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [hostelInfo, setHostelInfo] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/HostelLists/" + id)
      .then((result) => {
        setHostelInfo(result.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3001/AddRooms")
      .then((result) => {
        // Filter rooms based on hostel ID
        const filteredRooms = result.data.filter((room) => room.hostel === id);
        setRooms(filteredRooms);
      })
      .catch((err) => console.log(err));
  }, [id, refresh]);

  return (
    <main>
      <Navbar />
      <div className="container-left mt-5" style={{ width: "25%" }}>
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ width: "100%" }}
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/images/ph.jpg" className="d-block w-100" alt="" />
            </div>
            <div className="carousel-item">
              <img src="/images/ph.jpg" className="d-block w-100" alt="" />
            </div>
            <div className="carousel-item">
              <img src="/images/ph.jpg" className="d-block w-100" alt="" />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="hostel">
          <table className="hostel-table">
            <tbody>
              <tr>
                <td className="table-label">
                  <BsHousesFill className="icon" />
                  Hostel Name:
                </td>
                <td>{hostelInfo ? hostelInfo.Hostel_Name : ""}</td>
              </tr>
              <tr>
                <td className="table-label">
                  <BsFillGeoAltFill className="icon" />
                  Hostel Location:
                </td>
                <td>{hostelInfo ? hostelInfo.Hostel_Location : ""}</td>
              </tr>
              <tr>
                <td className="table-label">
                  <BsFillPersonLinesFill className="icon" />
                  Hostel Type:
                </td>
                <td>{hostelInfo ? hostelInfo.Hostel_Type : ""}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="container-right mt-5 border" style={{ width: "60%" }}>
        <h1>Rooms</h1>
        <div
          className="main-cards"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {/* Render room cards */}
          {rooms.map((room, index) => (
            <div
              className="card bg-light"
              key={index}
              style={{
                flex: "0 0 calc(30.33% - 20px)", // Set each card to take up one-third of the available space
                margin: "0 10px 20px 0", // Add margin to create spacing between cards
              }}
            >
              <div
                className="card-inner row text-dark"
                style={{
                  color: "black",
                  fontWeight: "normal", // corrected the spelling
                  display: "flex", // Make the buttons display in row
                  justifyContent: "space-between", // Distribute space evenly between buttons
                  alignItems: "center", // Align items vertically center
                }}
              >
                <div>
                  <img
                    src={`http://localhost:3001/images/${room.image}`}
                    alt={`Room ${room.RoomNo}`}
                    className="img-fluid mb-3"
                    style={{ maxHeight: "200px" }}
                  />
                  <h6 className="text-center">Room No: {room.RoomNo}</h6>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <h6 style={{ margin: "0", marginLeft: "10px" }}>
                      <FaBed className="icon" />: {room.RoomBed}
                    </h6>
                    <h6
                      style={{
                        color: "red",
                        fontSize: "14px",
                        margin: "0 0 0 50px",
                      }}
                    >
                      {" "}
                      <FaMoneyBillWave className="icon" />
                      Rs.{room.RoomPrice}/-
                    </h6>
                  </div>
                </div>
                <div>
                  <Link className="btn btn-info border">See More</Link>
                  {/* <button
                    className="btn btn-success"
                    // onClick={() => handleDelete(room._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Book Room
                  </button> */}
                  <Link
                    to={`/BookHostel/${room._id}`}
                    className="btn btn-success"
                    style={{ marginLeft: "10px" }}
                  >
                    BookRoom
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default VisitHostel;
