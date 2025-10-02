import { useState, useEffect } from "react";
import { FiCalendar, FiClock } from "react-icons/fi";
import "./bookinglist.css"; // reuse your existing styles
import { Link } from "react-router-dom";

export default function BookingHistory() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8080/api/appointments", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Appointments from API:", data);
        setAppointments(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    return timeString.slice(0, 5); // HH:mm
  };

  return (
    <div className="req">
      <div className="header-row">
        <h2>My Appointments</h2>
        <Link to={"/appointments/book"} className="create-link">
          <span className="plus">+ </span>Create New Appointment
        </Link>
      </div>

      <div className="requests-list">
        {appointments.map((appt) => (
          <div key={appt.id} className="request-card">
            <div className="request-info">
              <FiCalendar className="request-icon" size={30} />
              <div className="request-text">
                <span className="title">{appt.purpose}</span>
                <span className="time">
                  {formatDate(appt.date)} <FiClock /> {formatTime(appt.time)}
                </span>
              </div>
            </div>

            <span className={`status ${appt.status?.toLowerCase()}`}>
              {appt.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
