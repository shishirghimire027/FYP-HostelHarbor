import React, { useState } from "react";
import "./Manager.css";
import ManagerHeader from "../components/managerdash/ManagerHeader";
import ManagerSidebar from "../components/managerdash/ManagerSidebar";
import ManagerHome from "../components/managerdash/ManagerHome";
function Manager() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <div className="grid-containers">
        <ManagerHeader OpenSidebar={OpenSidebar} />
        <ManagerHome />
        <ManagerSidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      </div>
    </>
  );
}

export default Manager;
