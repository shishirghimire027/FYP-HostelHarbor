import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HostelProfile.css";

const UpdateHostelProfile = () => {
  // State to store manager's information
  const [managerInfo, setManagerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect hook to fetch manager's information when the component mounts
  useEffect(() => {
    // Function to fetch manager's information
    const fetchManagerInfo = async () => {
      try {
        // Retrieve the token from localStorage or sessionStorage
        const token = localStorage.getItem("token"); // Adjust based on where you store the token

        // Make a GET request with the token included in the authorization header
        const response = await axios.get("http://localhost:3001/managerInfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set the managerInfo state with the fetched data
        setManagerInfo(response.data);
        setLoading(false); // Set loading to false after successful data fetch
      } catch (error) {
        console.error("Error fetching manager information:", error);
        setError(error.message); // Set error state if there's an error
        setLoading(false); // Set loading to false on error
      }
    };

    // Call the fetchManagerInfo function
    fetchManagerInfo();
  }, []);




  // Display loading state while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the component with fetched managerInfo data
  return (
    <div className="banners">
        <form >
        <div className="img-banner">
          <label htmlFor="fileInput">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="150"
              color="white"
              fill="currentColor"
              className="bi bi-plus-square-dotted"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 0q-.25 0-.487.048l.194.98A1.5 1.5 0 0 1 2.5 1h.458V0zm2.292 0h-.917v1h.917zm1.833 0h-.917v1h.917zm1.833 0h-.916v1h.916zm1.834 0h-.917v1h.917zm1.833 0h-.917v1h.917zM13.5 0h-.458v1h.458q.151 0 .293.029l.194-.981A2.5 2.5 0 0 0 13.5 0m2.079 1.11a2.5 2.5 0 0 0-.69-.689l-.556.831q.248.167.415.415l.83-.556zM1.11.421a2.5 2.5 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415zM16 2.5q0-.25-.048-.487l-.98.194q.027.141.028.293v.458h1zM.048 2.013A2.5 2.5 0 0 0 0 2.5v.458h1V2.5q0-.151.029-.293zM0 3.875v.917h1v-.917zm16 .917v-.917h-1v.917zM0 5.708v.917h1v-.917zm16 .917v-.917h-1v.917zM0 7.542v.916h1v-.916zm15 .916h1v-.916h-1zM0 9.375v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .916v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .917v.458q0 .25.048.487l.98-.194A1.5 1.5 0 0 1 1 13.5v-.458zm16 .458v-.458h-1v.458q0 .151-.029.293l.981.194Q16 13.75 16 13.5M.421 14.89c.183.272.417.506.69.689l.556-.831a1.5 1.5 0 0 1-.415-.415zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373Q2.25 16 2.5 16h.458v-1H2.5q-.151 0-.293-.029zM13.5 16q.25 0 .487-.048l-.194-.98A1.5 1.5 0 0 1 13.5 15h-.458v1zm-9.625 0h.917v-1h-.917zm1.833 0h.917v-1h-.917zm1.834-1v1h.916v-1zm1.833 1h.917v-1h-.917zm1.833 0h.917v-1h-.917zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
            </svg>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              
            />
          </label>
        </div>
      </form>
      <table className="tablez text-white">
        <tbody>
          <tr>
            <td>Hostel Name</td>
            <td>{managerInfo.Hostel_Name}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{managerInfo.Hostel_Location}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{managerInfo.Hostel_Type}</td>
          </tr>
          {/* <tr>
            <td>Contact:</td>
            <td>{managerInfo.Manager_Contact}</td>
          </tr> */}
          {/* <tr>
            <td>Email:</td>
            <td>{managerInfo.email}</td>
          </tr> */}
        </tbody>
      </table>

      <table className="tablez text-white">
        <tbody>
          <tr>
            <td>Manager Name</td>
            <td>{managerInfo.Manager_Name}</td>
          </tr>
          <tr>
            <td>Contact</td>
            <td>{managerInfo.Manager_Contact}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{managerInfo.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UpdateHostelProfile;
