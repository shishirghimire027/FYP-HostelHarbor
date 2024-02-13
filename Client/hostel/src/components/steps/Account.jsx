
import React, { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContextProvider";

function Account() {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="container">
      <div className="row">
        {/* Left side */}
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="ManagerName" className="form-label">
              Manager Name
            </label>
            <input
              type="text"
              className="form-control"
              id="ManagerName"
              aria-describedby="ManagerName"
              onChange={handleChange}
              value={userData["ManagerName"] || ""}
              name="ManagerName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ManagerContact" className="form-label">
              Manager Contact
            </label>
            <input
              type="tel"
              className="form-control"
              id="ManagerContact"
              aria-describedby="ManagerContact"
              onChange={handleChange}
              value={userData["ManagerContact"] || ""}
              name="ManagerContact"
            />
          </div>
        </div>
        {/* Right side */}
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleChange}
              value={userData["email"] || ""}
              name="email"
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
              onChange={handleChange}
              value={userData["password"] || ""}
              name="password"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
