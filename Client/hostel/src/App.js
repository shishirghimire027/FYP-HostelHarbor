import React from "react";
import Signup from "./pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import HostelReg from "./pages/HostelReg";
import AdminHeader from "./components/AdminHeader";
import AdminHome from "./components/AdminHome";
import AdminSidebar from "./components/AdminSidebar";
import "./App.css";
import NoPage from "./pages/NoPage";
import Admin from "./pages/Admin";
import AdminAddHostel from "./pages/AdminAddHostel";
import AdminHostelList from "./pages/AdminHostelList";
import AddHostel from "./components/AddHostel";
import Create from "./components/Create";
import Update from "./components/Update";
import UpdateHostelList from "./components/UpdateHostelList";
import Delete from "./components/Delete";
import HostelList from "./components/HostelList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route index element={<Navigate to="/Login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/HostelReg" element={<HostelReg />} />

          <Route path="/Admin" element={<Admin />} />
          <Route path="/AdminAddHostel" element={<AdminAddHostel />} />
          <Route path="/AdminHostelList" element={<AdminHostelList />} />
          <Route path="/AdminHeader" element={<AdminHeader />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/AdminSidebar" element={<AdminSidebar />} />

          <Route path="/AddHostel" element={<AddHostel />} />
          <Route path="/HostelList" element={<HostelList />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/Update/:id" element={<Update />} />
          <Route path="/UpdateHostelList/:id" element={<UpdateHostelList />} />
          <Route path="/Delete" element={<Delete />} />
          {/* Add a catch-all route for the root path */}
          {/* <Route path="/*" element={<Navigate to="/signup" />} /> */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      {/* <div className="grid-container">
      <AdminHeader />
      <AdminHome />
      <AdminSidebar />

    </div> */}
    </>
  );
}

export default App;
