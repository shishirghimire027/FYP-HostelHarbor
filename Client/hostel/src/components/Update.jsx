import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';



function Update() {
  const {id} = useParams()
  const [Hostel_Name, setHostelName] = useState();
  const [Hostel_Type, setHostelType] = useState();
  const [Hostel_Location, setHostelLocation] = useState();
  const [Manager_Name, setManagerName] = useState();
  const [Manager_Contact, setManagerContact] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/getHostels/"+id)
      .then((result) => {console.log(result)
        setHostelName(result.data.Hostel_Name)
        setHostelType(result.data.Hostel_Type)
        setHostelLocation(result.data.Hostel_Location)
        setManagerName(result.data.Manager_Name)
        setManagerContact(result.data.Manager_Contact)
      
      })
      .catch((err) => console.log(err));
  }, [id]);


  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/Update/"+id, {
        Hostel_Name,
        Hostel_Type,
        Hostel_Location,
        Manager_Name,
        Manager_Contact,
      })
      .then((result) => {
        console.log(result);
        navigate("/AdminAddHostel"); // Providing the absolute path
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
    <div className="bg-white rounded p-3">
      <form onSubmit={Update}>
        <h2 className="mb-4">Upadte Hostel Details</h2>
        <div className="mb-3">
          <label htmlFor="HostelName" className="form-label">
            Hostel Name
          </label>
          <input
            type="text"
            className="form-control"
            id="HostelName"
            aria-describedby="HostelName"
            value={Hostel_Name}
            onChange={(e) => setHostelName(e.target.value)}
          />
        </div>
        <div className="row mb-5">
          <div className="col-md-6">
            <label htmlFor="Location" className="form-label">
              Hostel Location
            </label>
            <select className="form-select" aria-label="Hostel Location" value={Hostel_Location} onChange={(e) => setHostelLocation(e.target.value)}>
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
            <select className="form-select" aria-label="Hostel Type" value={Hostel_Type} onChange={(e) => setHostelType(e.target.value)}>
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
            value={Manager_Name}
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
            value={Manager_Contact}
            onChange={(e) => setManagerContact(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  </div>
  )
}

export default  Update;
