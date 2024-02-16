import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

function EditRoom() {
    const {id} = useParams()
    // const [rooms, setRooms] = useState([]);
    const [RoomNo, setRoomNo] = useState();
    const [RoomBed, setRoomBed] = useState();
    const [RoomType, setRoomType] = useState();
    const [RoomDescription, setRoomDescription] = useState();
    const [RoomPrice, setRoomPrice] = useState();
    // const [file, setFile] = useState([]);
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);


    useEffect(() => {
        axios
          .get("http://localhost:3001/AddRooms/"+id)
          .then((result) => {console.log("hey",result)
            setRoomNo(result.data.RoomNo)
            setRoomBed(result.data.RoomBed)
            setRoomType(result.data.RoomType)
            setRoomDescription(result.data.RoomDescription)
            setRoomPrice(result.data.RoomPrice)
          
          })
          .catch((err) => console.log(err));
      }, [id]);
    
    
      const Update = (e) => {
        e.preventDefault();
        axios
          .put("http://localhost:3001/UpdateRoom/"+id, {
            RoomNo,
            RoomBed,
            RoomType,
            RoomDescription,
            RoomPrice,
          })
          .then((result) => {
            console.log(result);
            navigate("/ManagerManageRoom"); // Providing the absolute path
          })
          .catch((err) => console.log(err));
      };
  return (
    <div>
        <form onSubmit={Update}>
                          <h2 className="mb-4">Update Room</h2>
                          <div className="mb-3">
                            <label htmlFor="RoomNo" className="form-label">
                              Room Number
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="RoomNo"
                              aria-describedby="RoomNo"
                              value={RoomNo}
                              onChange={(e) => setRoomNo(e.target.value)}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="RoomBed" className="form-label">
                              Total Beds
                            </label>
                            <select
                              className="form-select"
                              aria-label="Hostel Location"
                              value={RoomBed}
                              onChange={(e) => setRoomBed(e.target.value)}
                            >
                              <option defaultValue>Total Bed</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                            </select>
                          </div>
                          <div className="row mb-5">
                            <div className="col-md-6">
                              <label htmlFor="Room" className="form-label">
                                Room Type
                              </label>
                              <select
                                className="form-select"
                                aria-label="Romm Type"
                                value={RoomType}
                                onChange={(e) => setRoomType(e.target.value)}
                              >
                                <option defaultValue>Select Room Type</option>
                                <option>Attached</option>
                                <option>Non-Attached</option>
                              </select>
                            </div>
                          </div>

                          <div className="mb-3">
                            <label htmlFor="Price" className="form-label">
                              Price
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="Price"
                              aria-describedby="Price"
                              value={RoomPrice}
                              onChange={(e) => setRoomPrice(e.target.value)}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="Description" className="form-label">
                              Room Description
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="Description"
                              aria-describedby="Description"
                              value={RoomDescription}
                              onChange={(e) =>
                                setRoomDescription(e.target.value)
                              }
                            />
                          </div>

                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </form>
      
    </div>
  )
}

export default EditRoom
