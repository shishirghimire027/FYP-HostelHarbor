// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// function HostelList() {
//    const [hostelDetails, setHostelDetails] = useState([]);
//    const location = useLocation();

//    useEffect(() => {
//       // Check if there is data passed from AddHostel page
//       const addedHostel = location.state && location.state.addedHostel;

//       if (addedHostel) {
//          // If data is passed, update the state
//          setHostelDetails((prevHostels) => [...prevHostels, addedHostel]);
//       }
//    }, [location.state]);

//    return (
//       <div>
//          <h2>All Hostel Details</h2>
//          {hostelDetails.map((hostel) => (
//             <div key={hostel._id}>
//                <p>Hostel Name: {hostel.Hostel_Name}</p>
//                <p>Hostel Location: {hostel.Hostel_Location}</p>
//                {/* Add other details as needed */}
//                <hr />
//             </div>
//          ))}
//       </div>
//    );
// }

// export default HostelList;
