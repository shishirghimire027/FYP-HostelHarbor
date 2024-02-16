import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdateImage() {
  const { id } = useParams();
  const [image, setImage] = useState(""); // Initialize image state with an empty string

  const UpdateMain = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append("image", image);

      await axios.put(`http://localhost:3001/UpdateRoomImg/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      // Reload the page after successful submission
      window.location.reload();
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  return (
    <div>
      <form onSubmit={UpdateMain}>
        <div className="mb-3">
          <label className="form-label" htmlFor="roomImages">
            <b>Upload Room image</b>
          </label>
          <input
            type="file"
            className="form-control"
            id="roomImages"
            onChange={(e) => setImage(e.target.files[0] || "")} // Ensure that the value is never undefined
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateImage;
