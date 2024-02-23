import React, { useState } from "react";
import "./HostelReg.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HostelReg() {
  const [Hostel_Name, setHostelName] = useState("");
  const [Hostel_Type, setHostelType] = useState("");
  const [Hostel_Location, setHostelLocation] = useState("");
  const [Manager_Name, setManagerName] = useState("");
  const [Manager_Contact, setManagerContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/HostelReg", {
        Hostel_Name,
        Hostel_Type,
        Hostel_Location,
        Manager_Name,
        Manager_Contact,
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        navigate("/AddHostel"); // Providing the absolute path
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form className="RegForm" onSubmit={handleSubmit}>
        <h2 className="mb-4">Register Hostel</h2>
        <div className="mb-3">
          <label htmlFor="HostelName" className="form-label">
            Hostel Name
          </label>
          <input
            type="text"
            className="form-control"
            id="HostelName"
            aria-describedby="HostelName"
            onChange={(e) => setHostelName(e.target.value)}
          />
        </div>
        <div className="row mb-5">
          <div className="col-md-6">
            <label htmlFor="Location" className="form-label">
              Hostel Location
            </label>
            <select
              className="form-select"
              aria-label="Hostel Location"
              onChange={(e) => setHostelLocation(e.target.value)}
            >
              <option defaultValue>Select Location</option>
              <option>Baneshwor</option>
              <option>Tinkune</option>
              <option>Thapatali</option>
              <option>Buddhanagar</option>
              <option>Anamnagar</option>
              <option>Dillibazar</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="HostelType" className="form-label">
              Hostel Type
            </label>
            <select
              className="form-select"
              aria-label="Hostel Type"
              onChange={(e) => setHostelType(e.target.value)}
            >
              <option defaultValue>Select Hostel Type</option>
              <option>Boys</option>
              <option>Girls</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="ManagerName" className="form-label">
            Manager Name
          </label>
          <input
            type="text"
            className="form-control"
            id="ManagerName"
            aria-describedby="ManagerName"
            onChange={(e) => setManagerName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ManagerName" className="form-label">
            Manager Contact
          </label>
          <input
            type="tel"
            className="form-control"
            id="ManagerName"
            aria-describedby="ManagerName"
            onChange={(e) => setManagerContact(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default HostelReg;
