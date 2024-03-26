import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Membership() {
  const [Resident, setResident] = useState([]);
  const [refresh, setRefresh] = useState(false);
 

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("http://localhost:3001/ResidentLists", config)
      .then((result) => {
        const userId = jwtDecode(token).id;
        const filteredResident = result.data.filter(
          (res) => res.User_id === userId
        );
        setResident(filteredResident);
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  

  const handleBuy = async (residentName, residentEmail, residentPhone) => {
    console.log("Hello world");
    const payload = {
      return_url: "http://localhost:3000/PaymentSuccessfull/",
      website_url: "http://localhost:3000/",
      amount: 1300,
      purchase_order_id: "test12",
      purchase_order_name: "test",
      customer_info: {
        name: residentName,
        email: residentEmail,
        phone: residentPhone,
      },
    };
    const response = await axios.post(
      "http://localhost:3001/khalti-api",
      payload
    );
    console.log(response);
    if (response.data.success) {
      window.location.href = response.data.data.payment_url; // Redirect after initiating payment
    } else {
      console.error("Payment initiation failed");
    }
  };

 

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <button
        className="btn btn-success"
        onClick={() =>
          handleBuy(
            Resident.length > 0 ? Resident[0].userName : "",
            Resident.length > 0 ? Resident[0].userEmail : "",
            Resident.length > 0 ? Resident[0].userPhone : ""
          )
        }
      >
        Buy
      </button>
      <p>Name: {Resident.length > 0 ? Resident[0].userName : ""}</p>

     
    </div>
  );
}

export default Membership;
