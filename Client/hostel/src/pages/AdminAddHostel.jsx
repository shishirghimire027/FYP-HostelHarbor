import React, { useState } from "react";
import "./Admin.css";
import AdminHeader from "../components/AdminHeader";
import AddHostel from "../components/AddHostel";
import AdminSidebar from "../components/AdminSidebar";

function AdminAddHostel() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <div className="grid-container">
        <AdminHeader OpenSidebar={OpenSidebar} />
        <AddHostel />
        <AdminSidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      </div>
    </>
  );
}

export default AdminAddHostel;
