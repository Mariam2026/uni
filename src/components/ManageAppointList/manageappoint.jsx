import { useState } from "react";
import './manageappoint.css';

export default function ManageAppointList() {
  const [purpose, setPurpose] = useState("Academic Advising");
  const [staffID, setStaffID] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:30");
  return (
    <div className="req">
      <form>
        <div className="header-row">
          <h2>Manage Appointments</h2>
          <button className="select-appoint">Select Appointment</button>
        </div>

        <h2 className="type">Reschedule/Cancel</h2>
        <select className="requestType" value={purpose}>
          <option value="Rescheduled">Rescheduled</option>
          <option value="Cancel">Cancel</option>
        </select>

        <h2 className="type">Staff Member</h2>
        <select className="requestType" value={staffID}>
          <option value={1}>Alex Smith</option>
          <option value={2}>Sarah Johnson</option>
          <option value={3}>Michael Brown</option>
        </select>

        <h2 className="type">Date</h2>
        <input
          type="date"
          className="requestType"
          value={date}
          required
        />

        <h2 className="type">Time</h2>
        <input
          type="time"
          className="requestType"
          value={time}
          required
        />

        <button type="submit" className="sub">
          Submit
        </button>
      </form>
    </div>
  );
}
