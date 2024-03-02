import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewResident() {
    const [resident, setResident] = useState([]);
    const [refresh, setRefresh] = useState(false);
    // const [selectedRow, setSelectedRow] = useState(null);
  
    // const navigate = useNavigate();
  
    useEffect(() => {
      axios
        .get("http://localhost:3001/ResidentLists")
        .then((result) => {
            setResident(result.data);
        })
        .catch((err) => console.log(err));
    }, [refresh, setTotalHostels]);
  return (
    <div>
      
    </div>
  )
}

export default ViewResident
