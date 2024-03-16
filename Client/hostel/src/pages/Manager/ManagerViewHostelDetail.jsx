import React, { useState } from "react";
import "../Manager.css";
import ManagerHeader from "../../components/managerdash/ManagerHeader";
import ManagerSidebar from "../../components/managerdash/ManagerSidebar";
import ViewResident from "../../components/managerdash/ViewResident";

function ManagerManageRoom() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <div className="grid-containers">
        <ManagerHeader OpenSidebar={OpenSidebar} />
        <ViewResident />
        <ManagerSidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      </div>
    </>
  );
}

export default ManagerManageRoom;
