import React, { useState } from "react";
import "../Manager.css";
import ManagerHeader from "../../components/managerdash/ManagerHeader";
import ManageBooking from "../../components/managerdash/ManageBooking";
import ManagerSidebar from "../../components/managerdash/ManagerSidebar";

function ManagerManageBooking() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <>
      <div className="grid-containers">
        <ManagerHeader OpenSidebar={OpenSidebar} />
        <ManageBooking />
        <ManagerSidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      </div>
    </>
  );
}

export default ManagerManageBooking;
