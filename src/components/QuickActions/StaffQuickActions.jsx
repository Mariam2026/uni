import React from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiCalendar, FiBell } from "react-icons/fi";
import "./QuickActions.css";

export default function StaffQuickActions() {
  return (
    <div className="quick-actions">
      <Link to="/requests/manage" className="action-card">
        <FiPlus size={36} className="action-icon" />
        <span>
          Manage<br /> Requests 
        </span>
      </Link>
      <Link to="/appointments/staff/manage" className="action-card">
        <FiCalendar size={36} className="action-icon" />
        <span>
         Manage<br />Appointment
        </span>
      </Link>
      <Link to="/addupdates" className="action-card">
        <FiBell size={36} className="action-icon" />
        <span>
          Add<br />Updates
        </span>
      </Link>
    </div>
  );
}