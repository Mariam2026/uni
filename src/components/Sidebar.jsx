import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiFileText, FiCalendar, FiBell, FiUser } from "react-icons/fi";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/dashboard" className="sidebar-link">
              <FiHome size={25} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/requests" className="sidebar-link">
              <FiFileText size={25} /> My Requests
            </Link>
          </li>
          <li>
            <Link to="/appointments" className="sidebar-link">
              <FiCalendar size={25} /> Appointments
            </Link>
          </li>
          <li>
            <Link to="/notifications" className="sidebar-link">
              <FiBell size={25} /> Notifications
            </Link>
          </li>
          <li>
            <Link to="/profile" className="sidebar-link">
              <FiUser size={25} /> Profile
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}