import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsPersonLinesFill, BsTelephone, BsEnvelope, BsPencilSquare,BsCheck2Square } from "react-icons/bs";
import { MdOutlineCancelPresentation } from "react-icons/md";

const BookUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/userInfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
        setEditedUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleEdit = () => {
    setEditMode(!editMode); // Toggle edit mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditedUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:3001/userInfo", editedUserInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInfo(editedUserInfo);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  return userInfo ? (
    <main className="container">
      <h4>Customer Information
      <button onClick={handleEdit} style={{float: "right", border: "none", background: "transparent"}}>{editMode ? <MdOutlineCancelPresentation /> : <BsPencilSquare />}</button>
      {editMode && <button style={{float: "right", border: "none", background: "transparent"}}onClick={saveChanges}><BsCheck2Square /></button>} </h4>
      <div className="Upper-Container bg-light mt-2" style={{ padding: "2%", border: "1px solid #dee2e6" }}>
        <div className="row border-bottom pb-2 mb-2 align-items-center">
          <div className="col-1 text-center">
            <BsPersonLinesFill className="icon" />
          </div>
          <div className="col">
            {editMode ? (
              <>
                <input
                  type="text"
                  name="fname"
                  value={editedUserInfo.fname}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lname"
                  value={editedUserInfo.lname}
                  onChange={handleInputChange}
                  style={{marginLeft: "10px"}}
                  placeholder="Last Name"
                />
              </>
            ) : (
              <p className="mb-0">Book to: {userInfo.fname} {userInfo.lname}</p>
            )}
          </div>
        </div>
        <div className="row border-bottom pb-2 mb-2 align-items-center">
          <div className="col-1 text-center">
            <BsTelephone className="icon" />
          </div>
          <div className="col">
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={editedUserInfo.phone}
                onChange={handleInputChange}
                placeholder="Contact Number"
              />
            ) : (
              <p className="mb-0">Contact Number: {userInfo.phone}</p>
            )}
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-1 text-center">
            <BsEnvelope className="icon" />
          </div>
          <div className="col">
            {editMode ? (
              <input
                type="text"
                name="email"
                value={editedUserInfo.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            ) : (
              <p className="mb-0">Email: {userInfo.email}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  ) : null;
};

export default BookUserInfo;
