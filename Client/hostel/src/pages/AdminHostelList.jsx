import React, { useState } from "react";
import "./Admin.css";
import AdminHeader from "../components/AdminHeader";
import HostelList from "../components/HostelList";
import AdminSidebar from "../components/AdminSidebar";

function AdminHostelList() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <div className="grid-container">
        <AdminHeader OpenSidebar={OpenSidebar} />
        <HostelList />
        <AdminSidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      </div>
    </>
  );
}

export default AdminHostelList;
