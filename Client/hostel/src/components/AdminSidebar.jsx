import React from "react";
import {
  BsShield,
  BsGrid1X2Fill,
  BsHousesFill,
  BsHouseAddFill,
  BsExclamationTriangle,
  BsFileEarmarkText,
} from "react-icons/bs";
import "../pages/Admin.css";

function AdminSidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsShield className="icon_header" /> Admin
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="/Admin">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/">
            <BsHousesFill className="icon" /> Hostels
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/AdminAddHostel">
            <BsHouseAddFill className="icon" /> Add Hostels
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/">
            <BsExclamationTriangle className="icon" /> Recieve Complains
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/">
            <BsFileEarmarkText className="icon" /> Report
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default AdminSidebar;
