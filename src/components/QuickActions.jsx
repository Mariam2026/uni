import React from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiCalendar, FiBell } from "react-icons/fi";

export default function QuickActions() {
  return (
    <div className="quick-actions">
      <Link to="/requests/new" className="action-card">
        <FiPlus size={36} className="action-icon" />
        <span>
          Submit<br />New Request 
        </span>
      </Link>
      <Link to="/appointments/book" className="action-card">
        <FiCalendar size={36} className="action-icon" />
        <span>
         Book<br />Appointment
        </span>
      </Link>
      <Link to="/notifications" className="action-card">
        <FiBell size={36} className="action-icon" />
        <span>
          View<br />Notifications
        </span>
      </Link>
    </div>
  );
}