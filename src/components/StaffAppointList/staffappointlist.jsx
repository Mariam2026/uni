import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";
import axios from "axios";
import "./staffappointlist.css";

export default function StaffAppointList() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:8080/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAppointments();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    return timeString.slice(0, 5);
  };

  const filteredAppointments = appointments.filter((appt) =>
    (appt.comment || appt.purpose || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="req">
      <div className="header-row">
        <h2>All Appointments</h2>
        <input
          type="text"
          className="search-bar"
          placeholder="Search by purpose/comment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="requests-list">
        {filteredAppointments.map((appt) => (
          <div key={appt.id} className="request-card">
            <div className="request-info">
              <FiCalendar className="request-icon" size={30} />
              <div className="request-text">
                <span className="title">{appt.comment || appt.purpose}</span>
                <span className="student">
                  <FiUser /> {appt.studentName || "Unknown Student"}
                </span>
                <span className="time">
                  {formatDate(appt.date)} <FiClock /> {formatTime(appt.time)}
                </span>
              </div>
            </div>

            <span className={`status ${appt.status?.toLowerCase()}`}>
              {appt.status}
            </span>

            {/* ✅ Navigate to Manage page with appointment state */}
            <button
              className="select-btn"
              onClick={() =>
                navigate("/appointments/staff/manage", { state: { appointment: appt } })
              }
            >
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
