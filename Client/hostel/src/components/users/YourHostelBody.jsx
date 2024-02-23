import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function YourHostelBody() {
  
  const [hostels, setHostels] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/HostelLists")
      .then((result) => {
        console.log(result);
        setHostels(result.data);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  return (
    <main className="container">
      <h1>Find Your Match</h1>
      <div className="row">
        {/* Render room cards */}
        {hostels.map((hostel, index) => (
          <div className="col-md-4" key={index}>
            <div className="card bg-light mb-3">
              <div
                className="card-body text-dark"
                style={{ fontWeight: "normal" }}
              >
                <h5 className="card-title">
                  Hostel Name: {hostel.Hostel_Name}
                </h5>
                <p className="card-text">Location: {hostel.Hostel_Location}</p>
                <p className="card-text">Hostel Type: {hostel.Hostel_Type}</p>
                <Link
                    to={`/VisitHostel/${hostel._id}`}
                    className="btn btn-success"
                  >
                    Visit Hostel
                  </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default YourHostelBody;
