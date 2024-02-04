import React, { useState } from "react";
import "./Admin.css";
import AdminHeader from "../components/AdminHeader";
import AdminHome from "../components/AdminHome";
import AdminSidebar from "../components/AdminSidebar";
function Admin() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <div className="grid-container">
        <AdminHeader OpenSidebar={OpenSidebar} />
        <AdminHome />
        <AdminSidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      </div>
    </>
  );
}

export default Admin;
