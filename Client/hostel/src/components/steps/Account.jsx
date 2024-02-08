import React, { useContext } from 'react';
import { StepperContext } from '../../contexts/StepperContext';

function Account() {
    const { userData, setUserData } = useContext(StepperContext);
    const handleChange = (e) => {
        const { name, value } = e.target; // Corrected line
        setUserData({ ...userData, [name]: value });
    }

    return (
        <div className='flex flex-col'>
            <div className="mb-3">
          <label htmlFor="ManagerName" className="form-label">
            Manager Name
          </label>
          <input
            type="text"
            className="form-control"
            id="ManagerName"
            aria-describedby="ManagerName"
            // onChange={(e) => setManagerName(e.target.value)}
            onChange={handleChange}
            value={userData["ManagerName"] || ""}
            name='ManagerName'
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
            // onChange={(e) => setManagerContact(e.target.value)}
            onChange={handleChange}
            value={userData["ManagerContact"] || ""}
            name='ManagerContact'
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
                    onChange={handleChange}
                    value={userData["email"] || ""}
                    name='email'
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
                    // value={password}
                    onChange={handleChange}
                    value={userData["password"] || ""}
                    name='password'
                    
                />
            </div>
        </div>
    );
}

export default Account;
