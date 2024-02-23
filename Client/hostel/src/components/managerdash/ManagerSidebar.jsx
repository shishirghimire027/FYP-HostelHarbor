import React from "react";
import {
  BsBriefcaseFill,
  BsGrid1X2Fill,
  BsHousesFill,
  BsHouseGear,
  BsCalendar,
  BsFileSpreadsheet,
  BsFileTextFill,
} from "react-icons/bs";
import "../../pages/Manager.css";

function ManagerSidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="managersidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsBriefcaseFill className="icon_header" /> Manager
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="/Manager">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/">
            <BsHousesFill className="icon" /> View Hostel Detail
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/">
            <BsHouseGear className="icon" /> Manage Hostel
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/ManagerManageRoom">
            <BsGrid1X2Fill className="icon" /> Manage Rooms
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/">
            <BsCalendar className="icon" /> Manage Booking
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/">
            <BsFileSpreadsheet className="icon" /> Invoicing
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/">
            <BsFileTextFill className="icon" /> Access Report
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default ManagerSidebar;
