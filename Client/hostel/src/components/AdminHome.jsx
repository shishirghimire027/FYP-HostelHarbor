import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../pages/Admin.css";
import {
  BsHousesFill,
  BsHouseAddFill,
  BsPersonCheck,
  BsPersonAdd,
} from "react-icons/bs";

function AdminHome() {


  const [pendingRequests, setPendingRequests] = useState(0);
  const [users, setUsers] = useState(0);
  const [totalHostels, setTotalHostel] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/AddHostels")
      .then((result) => {
        const totalHostels = result.data.length;
        console.log("Total Hostels in AddHostel:", totalHostels);
        setPendingRequests(totalHostels); // Update state with the data length
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/Users")
      .then((result) => {
        const totalUsers = result.data.length;
        console.log("Total Users:", totalUsers);
        setUsers(totalUsers); // Update state with the data length
      })
      .catch((err) => console.log(err));
  }, []);
  
  useEffect(() => {
    axios
      .get("http://localhost:3001/HostelLists")
      .then((result) => {
        const totalHostels = result.data.length;
        console.log("Total Users:", totalHostels);
        setTotalHostel(totalHostels); // Update state with the data length
      })
      .catch((err) => console.log(err));
  }, []);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Admin-Dashboard</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>HOSTELS</h3>
            <BsHousesFill className="card_icon" />
          </div>
          <h1>{totalHostels}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>PENDING REQUESTS</h3>
            <BsHouseAddFill className="card_icon" />
          </div>
          <h1>{pendingRequests}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>USERS</h3>
            <BsPersonCheck className="card_icon" />
          </div>
          <h1>{users}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>BOOKING REQUEST</h3>
            <BsPersonAdd className="card_icon" />
          </div>
          <h1>8650</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="pv"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="uv"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default AdminHome;
