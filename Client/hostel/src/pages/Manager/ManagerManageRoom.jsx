import React, { useState } from "react";
import "../Manager.css";
import ManagerHeader from "../../components/managerdash/ManagerHeader";
import ManageRoom from "../../components/managerdash/ManageRooms";
import ManagerSidebar from "../../components/managerdash/ManagerSidebar";

function ManagerManageRoom() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <div className="grid-containers">
        <ManagerHeader OpenSidebar={OpenSidebar} />
        <ManageRoom />
        <ManagerSidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      </div>
    </>
  );
}

export default ManagerManageRoom;
