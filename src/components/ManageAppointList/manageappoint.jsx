import { useState, useEffect } from "react";
import "./manageappoint.css";

export default function ManageAppointList() {
  const [appointments, setAppointments] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [purpose, setPurpose] = useState("Scheduled"); // default: Reschedule
  const [staffID, setStaffID] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:30");

  // Fetch all appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:8080/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        // Ensure each appointment has a numeric ID
        const fixedData = data
          .map((appt) => ({
            ...appt,
            id: appt.id ?? appt.apptID,
          }))
          .filter((appt) => typeof appt.id === "number");

        setAppointments(fixedData);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedId) {
      alert("Please select an appointment first.");
      return;
    }

    const token = localStorage.getItem("token");
    const id = Number(selectedId);

    try {
      if (purpose === "Cancel") {
        const res = await fetch(`http://localhost:8080/api/appointments/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          alert("Appointment cancelled ❌");
          setAppointments((prev) => prev.filter((appt) => appt.id !== id));
          setSelectedId("");
        } else {
          const text = await res.text();
          const data = text ? JSON.parse(text) : null;
          alert("Error: " + (data?.message || "Failed to cancel appointment"));
        }
      } else {
        if (!date || !time) {
          alert("Please select both date and time to reschedule.");
          return;
        }

        const dto = {
          staffID,
          date,
          time,
          purpose: "Reschedule",
          status: "Scheduled",
        };

        const res = await fetch(`http://localhost:8080/api/appointments/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dto),
        });

        const text = await res.text();
        const data = text ? JSON.parse(text) : null;

        if (res.ok) {
          alert("Appointment rescheduled ✅");
          setAppointments((prev) =>
            prev.map((appt) => (appt.id === id ? { ...appt, ...dto } : appt))
          );
        } else {
          alert("Error: " + (data?.message || "Failed to reschedule appointment"));
        }
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Something went wrong while managing appointment");
    }
  };

  return (
    <div className="req">
      <form onSubmit={handleSubmit}>
        <div className="header-row">
          <h2>Manage Appointments</h2>
        </div>

        {/* Select Appointment */}
        <h2 className="type">Select Appointment</h2>
        <select
          className="requestType"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          required
        >
          <option value="">-- Choose an appointment --</option>
          {appointments.map((appt) => (
            <option key={appt.id} value={appt.id}>
              {appt.studentName || "Unknown Student"} – {appt.purpose || "No Purpose"} – {appt.date} {appt.time}
            </option>
          ))}
        </select>

        {/* Action */}
        <h2 className="type">Reschedule/Cancel</h2>
        <select
          className="requestType"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        >
          <option value="Scheduled">Reschedule</option>
          <option value="Cancel">Cancel</option>
        </select>

        {/* Staff Member */}
        <h2 className="type">Staff Member</h2>
        <select
          className="requestType"
          value={staffID}
          onChange={(e) => setStaffID(Number(e.target.value))}
        >
          <option value={1}>Alex Smith</option>
          <option value={2}>Sarah Johnson</option>
          <option value={3}>Michael Brown</option>
        </select>

        {/* Date/Time only for reschedule */}
        {purpose === "Scheduled" && (
          <>
            <h2 className="type">Date</h2>
            <input
              type="date"
              className="requestType"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <h2 className="type">Time</h2>
            <input
              type="time"
              className="requestType"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </>
        )}

        <button type="submit" className="sub">
          {purpose === "Cancel" ? "Cancel Appointment" : "Reschedule Appointment"}
        </button>
      </form>
    </div>
  );
}
