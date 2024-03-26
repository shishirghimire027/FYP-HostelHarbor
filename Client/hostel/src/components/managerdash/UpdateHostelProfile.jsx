import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HostelProfile.css";
import { BsPencilSquare, BsCheck2Square } from "react-icons/bs";
import { MdOutlineCancelPresentation } from "react-icons/md";

const UpdateHostelProfile = () => {
  const [managerInfo, setManagerInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedmanagerInfo, setEditedmanagerInfo] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(false);

  useEffect(() => {
    const fetchmanagerInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/managerInfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setManagerInfo(response.data);
        setEditedmanagerInfo(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    fetchmanagerInfo();
  }, []);

  const handleEdit = () => {
    setEditMode(!editMode); // Toggle edit mode
    setShowImageUpload(!editMode); // Toggle image upload display
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditedmanagerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const saveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("Hostel_Name", editedmanagerInfo.Hostel_Name);
      formData.append("Hostel_Location", editedmanagerInfo.Hostel_Location);
      formData.append("Hostel_Type", editedmanagerInfo.Hostel_Type);
      formData.append("Manager_Name", editedmanagerInfo.Manager_Name);
      formData.append("Manager_Contact", editedmanagerInfo.Manager_Contact);
      formData.append("email", editedmanagerInfo.email);

      const token = localStorage.getItem("token");
      await axios.put("http://localhost:3001/updateManagerInfo", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // Reload the page after saving changes
      window.location.reload();
      setManagerInfo(editedmanagerInfo);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };
  return managerInfo ? (
    <div className="banners" style={{ width: "100%" }}>
      <div className="btns" style={{ float: "right" }}>
        <button
          onClick={handleEdit}
          className="edit-button"
          style={{
            float: "right",
            border: "none",
            background: "transparent",
          }}
        >
          {editMode ? (
            <MdOutlineCancelPresentation className="icon" color="red" />
          ) : (
            <BsPencilSquare className="icon" color="white" />
          )}
        </button>
        {editMode && (
          <button
            className="save-button"
            onClick={saveChanges}
            style={{
              float: "right",
              border: "none",
              background: "transparent",
            }}
          >
            <BsCheck2Square className="icon" color="lightgreen" />
          </button>
        )}{" "}
      </div>
      <table className="tablez text-white">
        <tbody>
          <div className="img-banner">
            {/* Display the uploaded image if available */}
            {!editMode && managerInfo && managerInfo.image ? (
              <img
                className="hostel-img"
                src={`http://localhost:3001/images/hostels/${managerInfo.image}`}
                alt="Manager"
              />
            ) : (
              <div className="info-value"></div>
            )}
            {editMode && (
              <div>
                <label htmlFor="imageUpload" className="edit-image-label mb-2">
                  Upload New Image
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: showImageUpload ? "block" : "none" }}
                />
              </div>
            )}
          </div>
        </tbody>
      </table>
      <table className="tablez text-white">
        <tbody>
          <tr>
            <td>Hostel Name</td>
            <td>
              {" "}
              {editMode ? (
                <input
                  type="text"
                  name="Hostel_Name"
                  value={editedmanagerInfo.Hostel_Name}
                  onChange={handleInputChange}
                  placeholder="Hostel Name"
                />
              ) : (
                <div className="info-value">{managerInfo.Hostel_Name}</div>
              )}
            </td>
          </tr>
          <tr>
            <td>Hostel Location</td>
            <td>
              {editMode ? (
                <input
                  type="text"
                  name="Hostel_Location"
                  value={editedmanagerInfo.Hostel_Location}
                  onChange={handleInputChange}
                  placeholder="Hostel Location"
                />
              ) : (
                <div className="info-value">{managerInfo.Hostel_Location}</div>
              )}
            </td>
          </tr>
          <tr>
            <td>Hostel Type</td>
            <td>
              {" "}
              {editMode ? (
                <input
                  type="text"
                  name="Hostel_Type"
                  value={editedmanagerInfo.Hostel_Type}
                  onChange={handleInputChange}
                  placeholder="Hostel Type"
                />
              ) : (
                <div className="info-value">{managerInfo.Hostel_Type}</div>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <table className="tablez text-white">
        <tbody>
          <tr>
            <td>Manager Name</td>
            <td>
              {editMode ? (
                <input
                  type="text"
                  name="Manager_Name"
                  value={editedmanagerInfo.Manager_Name}
                  onChange={handleInputChange}
                  placeholder="Manager Contact"
                />
              ) : (
                <div className="info-value">{managerInfo.Manager_Name}</div>
              )}
            </td>
          </tr>
          <tr>
            <td>Manager Contact</td>
            <td>
              {editMode ? (
                <input
                  type="text"
                  name="Manager_Contact"
                  value={editedmanagerInfo.Manager_Contact}
                  onChange={handleInputChange}
                  placeholder="Manager Contact"
                />
              ) : (
                <div className="info-value">{managerInfo.Manager_Contact}</div>
              )}
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              {editMode ? (
                <input
                  type="text"
                  name="email"
                  value={editedmanagerInfo.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              ) : (
                <div className="info-value">{managerInfo.email}</div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : null;
};

export default UpdateHostelProfile;
