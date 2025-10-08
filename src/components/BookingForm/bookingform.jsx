import { useState } from "react";
import axios from "axios";
import "./bookingform.css";

export default function BookingForm() {
  const [purpose, setPurpose] = useState("Academic Advising");
  const [staffID, setStaffID] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:30");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to book an appointment.");
      return;
    }

    setLoading(true);

    try {
      // Send booking request directly to backend
      const res = await axios.post(
        "http://localhost:8080/api/appointments",
        {
          status: "Scheduled",
          purpose,
          staffID,
          date,
          time: time + ":00",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Appointment scheduled successfully!");
      console.log(res.data);
      setDate("");
      setTime("10:30");
    } catch (err) {
      // Extract backend error message correctly
      let message = "Failed to schedule appointment.";

      if (err.response?.data) {
        if (typeof err.response.data === "string") {
          message = err.response.data; // simple string
        } else if (err.response.data.message) {
          message = err.response.data.message; // backend sends { message: "..." }
        } else {
          message = JSON.stringify(err.response.data); // fallback
        }
      }

      alert(message);
      console.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="req">
      <form onSubmit={handleSubmit}>
        <div className="header-row">
          <h2>Book Appointment</h2>
        </div>

        <h2 className="type">Reason</h2>
        <select
          className="requestType"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        >
          <option value="Academic Advising">Academic Advising</option>
          <option value="Career Counseling">Career Counseling</option>
          <option value="Financial Aid">Financial Aid</option>
        </select>

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

        <button type="submit" className="sub" disabled={loading}>
          {loading ? "Scheduling..." : "Schedule Appointment"}
        </button>
      </form>
    </div>
  );
}
