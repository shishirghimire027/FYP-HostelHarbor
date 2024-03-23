import React, { useState } from "react";
import "./HostelReg.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HostelReg() {
  const [formData, setFormData] = useState({
    Hostel_Name: "",
    Hostel_Type: "",
    Hostel_Location: "",
    Manager_Name: "",
    Manager_Contact: "",
    email: "",
    password: "",
    file: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { file, ...data } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append("file", file);
    for (const key in data) {
      formDataToSend.append(key, data[key]);
    }

    try {
      const response = await axios.post("http://localhost:3001/HostelReg", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      navigate("/AddHostel");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="RegForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="HostelName" className="form-label">
            Hostel Name
          </label>
          <input
            type="text"
            className="form-control"
            id="HostelName"
            name="Hostel_Name"
            value={formData.Hostel_Name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="HostelType" className="form-label">
            Hostel Type
          </label>
          <select
            className="form-select"
            id="HostelType"
            name="Hostel_Type"
            value={formData.Hostel_Type}
            onChange={handleChange}
          >
            <option value="">Select Hostel Type</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="Location" className="form-label">
            Hostel Location
          </label>
          <select
            className="form-select"
            id="Location"
            name="Hostel_Location"
            value={formData.Hostel_Location}
            onChange={handleChange}
          >
            <option value="">Select Location</option>
            <option value="Baneshwor">Baneshwor</option>
            <option value="Tinkune">Tinkune</option>
            <option value="Thapatali">Thapatali</option>
            <option value="Buddhanagar">Buddhanagar</option>
            <option value="Anamnagar">Anamnagar</option>
            <option value="Dillibazar">Dillibazar</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="ManagerName" className="form-label">
            Manager Name
          </label>
          <input
            type="text"
            className="form-control"
            id="ManagerName"
            name="Manager_Name"
            value={formData.Manager_Name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ManagerContact" className="form-label">
            Manager Contact
          </label>
          <input
            type="text"
            className="form-control"
            id="ManagerContact"
            name="Manager_Contact"
            value={formData.Manager_Contact}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="roomImages">
            <b>Upload Room images</b>
          </label>
          <input
            type="file"
            className="form-control"
            id="roomImages"
            name="file"
            onChange={handleFileChange}
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
