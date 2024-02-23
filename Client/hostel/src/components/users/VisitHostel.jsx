import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./VisitHostel.css"
import {
  BsFillPersonLinesFill,
  BsFillGeoAltFill,
  BsHousesFill,
  
} from "react-icons/bs";

function VisitHostel() {
  const { id } = useParams();
  const [hostelInfo, setHostelInfo] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/HostelLists/" + id)
      .then((result) => {
        setHostelInfo(result.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <main>
      <div className="container-left mt-5" style={{ width: "25%" }}>
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" style={{ width: "100%" }}>
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
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="hostel">
          <table className="hostel-table">
            <tbody>
              <tr>
                <td className="table-label"><BsHousesFill className="icon" />Hostel Name:</td>
                <td>{hostelInfo ? hostelInfo.Hostel_Name : ""}</td>
              </tr>
              <tr>
                <td className="table-label"><BsFillGeoAltFill className="icon"/>Hostel Location:</td>
                <td>{hostelInfo ? hostelInfo.Hostel_Location : ""}</td>
              </tr>
              <tr>
                <td className="table-label"><BsFillPersonLinesFill className="icon"/>Hostel Type:</td>
                <td>{hostelInfo ? hostelInfo.Hostel_Type : ""}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default VisitHostel;
