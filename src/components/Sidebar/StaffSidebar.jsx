import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiFileText, FiCalendar, FiBell, FiUser } from "react-icons/fi";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/dashboard/staff" className="sidebar-link">
              <FiHome size={25} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/requests/staff" className="sidebar-link">
              <FiFileText size={25} /> All Requests
            </Link>
          </li>
          <li>
            <Link to="/appointments/staff" className="sidebar-link">
              <FiCalendar size={25} /> Appointments
            </Link>
          </li>
          <li>
            <Link to="/updates" className="sidebar-link">
              <FiBell size={25} /> Reports
            </Link>
          </li>
          <li>
            <Link to="/profile/staff" className="sidebar-link">
              <FiUser size={25} /> Profile
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}