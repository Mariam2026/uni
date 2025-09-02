import React from "react";
import { Link } from "react-router-dom";

export default function StatsSection({ activeRequests, upcomingAppointment }) {
  return (
    <div className="stats-section">
      <div className="stat-card">
        <h3>Active Requests</h3>
        <p className="stat-number">{activeRequests}</p>
        <Link to="/requests">View Requests</Link>
      </div>
      <div className="stat-card">
        <h3>Upcoming Appointment</h3>
        <p className="stat-number">{upcomingAppointment}</p>
        <Link to="/appointments">View Appointments</Link>
      </div>
    </div>
  );
}