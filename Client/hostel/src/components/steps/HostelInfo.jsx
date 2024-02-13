import React, { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContextProvider";

function HostelInfo() {
  const { userData, setUserData } = useContext(StepperContext);
  const handleChange = (e) => {
    const { name, value } = e.target; // Corrected line
    setUserData({ ...userData, [name]: value });
  };
  return (
    <>
      <div className="mb-3">
        <label htmlFor="HostelName" className="form-label">
          Hostel Name
        </label>
        <input
          type="text"
          className="form-control"
          id="HostelName"
          aria-describedby="HostelName"
          // onChange={(e) => setHostelName(e.target.value)}
          onChange={handleChange}
          value={userData["HostelName"] || ""}
          name="HostelName"
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
            //   onChange={(e) => setHostelLocation(e.target.value)}
            onChange={handleChange}
            value={userData["HostelLocation"] || ""}
            name="HostelLocation"
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
            //   onChange={(e) => setHostelType(e.target.value)}
            onChange={handleChange}
            value={userData["HostelType"] || ""}
            name="HostelType"
          >
            <option defaultValue>Select Hostel Type</option>
            <option>Boys</option>
            <option>Girls</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default HostelInfo;
