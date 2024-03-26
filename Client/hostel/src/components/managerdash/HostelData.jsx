import React, { useState, useEffect } from "react";
import axios from "axios";

const HostelData = () => {
  const [managerInfo, setManagerInfo] = useState(null);

  useEffect(() => {
    const fetchManagerInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/managerInfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setManagerInfo(response.data);
      } catch (error) {
        console.error("Error fetching manager information:", error);
      }
    };

    fetchManagerInfo();
  }, []);

  return (
    <div>
      <h2>Hostel Information</h2>
      {managerInfo ? (
        <div>
          <p>
            <strong>ID:</strong> {managerInfo._id}
          </p>
          <p>
            <strong>Hostel Name:</strong> {managerInfo.Hostel_Name}
          </p>
          <p>
            <strong>Location:</strong> {managerInfo.Hostel_Location}
          </p>
          <p>
            <strong>Type:</strong> {managerInfo.Hostel_Type}
          </p>
          <p>
            <strong>Manager Name:</strong> {managerInfo.Manager_Name}
          </p>
          <p>
            <strong>Manager Contact:</strong> {managerInfo.Manager_Contact}
          </p>
          <p>
            <strong>Email:</strong> {managerInfo.email}
          </p>
          {/* {managerInfo.image && ( // Check if image data exists
            <div>
              <strong>Manager Image:</strong>
              <img src={`http://localhost:3001/images/hostels/${managerInfo.image}`} alt="Manager" />
            </div>
          )} */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HostelData;
