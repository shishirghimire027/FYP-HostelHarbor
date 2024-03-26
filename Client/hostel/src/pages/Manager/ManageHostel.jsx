import React, { useState } from "react";
import "../Manager.css";
import "./MVHD.css";
import ManagerHeader from "../../components/managerdash/ManagerHeader";

import ManagerSidebar from "../../components/managerdash/ManagerSidebar";
import UpdateHostelProfile from "../../components/managerdash/UpdateHostelProfile";

function ManageHostel() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <div className="grid-containers">
        <ManagerHeader OpenSidebar={OpenSidebar} />
        <div className="main mt-2" style={{ width: "100%" }}>
          <div className="Hostel-Profile mt-2">
            <UpdateHostelProfile />
          </div>
        </div>
        <ManagerSidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
      </div>
    </>
  );
}

export default ManageHostel;
