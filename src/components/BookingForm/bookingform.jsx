import { useState } from "react";
import axios from "axios";
import "./bookingform.css";

export default function BookingForm() {
  const [reason, setReason] = useState("Academic Advising");
  const [staff, setStaff] = useState("Alex Smith");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8080/api/appointments",
        { reason, staff, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Appointment scheduled successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to schedule appointment");
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
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          <option value="Academic Advising">Academic Advising</option>
          <option value="Career Counseling">Career Counseling</option>
          <option value="Financial Aid">Financial Aid</option>
        </select>

        <h2 className="type">Staff Member</h2>
        <select
          className="requestType"
          value={staff}
          onChange={(e) => setStaff(e.target.value)}
        >
          <option value="Alex Smith">Alex Smith</option>
          <option value="Sarah Johnson">Sarah Johnson</option>
          <option value="Michael Brown">Michael Brown</option>
        </select>

        <h2 className="type">Date</h2>
        <input
          type="date"
          className="requestType"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit" className="sub">
          Schedule Appointment
        </button>
      </form>
    </div>
  );
}
