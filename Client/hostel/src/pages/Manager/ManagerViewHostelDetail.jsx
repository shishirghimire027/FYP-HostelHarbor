import React, { useState } from "react";
import "./MVHD.css";
import "../Manager.css";
import ManagerHeader from "../../components/managerdash/ManagerHeader";
import ManagerSidebar from "../../components/managerdash/ManagerSidebar";
import HostelProfile from "../../components/managerdash/HostelProfile";
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

        {/* Render HostelProfile */}
        <div
          className="main"
          style={{ border: "1px solid black", width: "170%" }}
        >
          <div className="Hostel-Profile mt-2">
            <HostelProfile />
          </div>

          <ViewResident />
        </div>

        <ManagerSidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      </div>
    </>
  );
}

export default ManagerManageRoom;
