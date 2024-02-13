import React, { useContext, useEffect } from "react";
import { StepperContext } from "../../contexts/StepperContextProvider";

function Detail() {
  const { userData, setUserData } = useContext(StepperContext);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  

  const handleChange = (e) => {
    const { name, files } = e.target;
    const fileList = [];
    for (let i = 0; i < files.length; i++) {
      fileList.push({
        name: files[i].name,
        size: files[i].size,
        type: files[i].type,
        data: URL.createObjectURL(files[i])
      });
    }
    // Update the state with the array of file information
    const updatedUserData = { ...userData, [name]: fileList };
    setUserData(updatedUserData);
  
    // Save updated user data to local storage
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
  };
  

  return (
    <>
      <div className="row">
        {/* Left side */}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label" htmlFor="citizenshipFront">
              <b>Upload Manager's Citizenship ID (Front)</b>
            </label>
            <input
              type="file"
              className="form-control"
              id="citizenshipFront"
              onChange={handleChange}
              name="citizenshipFront"
              
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="citizenshipBack">
              <b>Upload Manager's Citizenship ID (Back)</b>
            </label>
            <input
              type="file"
              className="form-control"
              id="citizenshipBack"
              onChange={handleChange}
              name="citizenshipBack"
              
            />
          </div>
        </div>
        {/* Right side */}
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label" htmlFor="propertyOwnership">
              <b>Property Ownership Proof</b>
            </label>
            <input
              type="file"
              className="form-control"
              id="propertyOwnership"
              onChange={handleChange}
              name="propertyOwnership"
              multiple // Allow multiple files to be selected
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="noc">
              <b>NOC</b>
            </label>
            <input
              type="file"
              className="form-control"
              id="noc"
              onChange={handleChange}
              name="noc"
              multiple // Allow multiple files to be selected
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
