import React from "react";
import { Link } from "react-router-dom";
import "./Stats.css";

export default function StatsSection({ activeRequests, upcomingAppointment }) {
  return (
    <div className="stats-section">
      <div className="stat-card">
        <h3>Number of  Requests Submitted Today</h3>
        <p className="stat-number">{activeRequests}</p>
        <Link to="/requests/staff">View Requests</Link>
      </div>
      <div className="stat-card">
        <h3>Upcoming Appointment For Today</h3>
        <p className="stat-number">{upcomingAppointment}</p>
        <Link to="/appointments/staff">View Appointments</Link>
      </div>
    </div>
  );
}