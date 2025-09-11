import React, { useState } from "react";
import "./appointcalendar.css";

const AppointCalendar = () => {
  // Example month/year
  const [month, setMonth] = useState(3); // April (0 = Jan, 1 = Feb, ...)
  const [year, setYear] = useState(2024);

  // Example appointments
  const [appointments] = useState([
    { date: "2024-04-05", time: "11:00 AM", title: "ID Renewal" },
    { date: "2024-04-11", time: "9:30 AM", title: "Housing Application" },
    { date: "2024-04-24", time: "11:00 AM", title: "Meeting with Advisor" },
  ]);

  // Get number of days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Find first day of month (0 = Sunday, 6 = Saturday)
  const firstDay = new Date(year, month, 1).getDay();

  // Generate calendar cells
  const weeks = [];
  let currentDay = 1 - firstDay; // Start from first Sunday before 1st day

  for (let row = 0; row < 6; row++) {
    let week = [];
    for (let col = 0; col < 7; col++) {
      if (currentDay < 1 || currentDay > daysInMonth) {
        week.push(null); // empty cell
      } else {
        week.push(currentDay);
      }
      currentDay++;
    }
    weeks.push(week);
  }

  // Format helper (YYYY-MM-DD)
  const formatDate = (d) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  return (
    <div className="container my-5">
      {/* Title + Book Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Appointments</h2>
        <button className="btn btn-primary">Book Appointment</button>
      </div>

      {/* Calendar */}
      <div className="calendar mb-5">
        <table>
          <thead className="bg-light">
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, i) => (
              <tr key={i}>
                {week.map((day, j) => {
                  if (!day) return <td key={j}></td>;

                  const dayAppointments = appointments.filter(
                    (a) => a.date === formatDate(day)
                  );

                  return (
                    <td key={j}>
                      {day}
                      {dayAppointments.map((appt, k) => (
                        <div key={k} className="appointment-tag">
                          {appt.time}
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upcoming Appointments */}
      <h4 className="fw-bold mb-3">Upcoming Appointments</h4>
      <div className="upcoming-table bg-white">
        <table className="table mb-0">
          <tbody>
            {appointments.map((appt, i) => (
              <tr key={i}>
                <td className="fw-bold">{new Date(appt.date).getDate()}</td>
                <td>
                  {new Date(appt.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td>{appt.title}</td>
                <td className="text-end">
                  <a href="#" className="btn-reschedule">
                    Reschedule
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointCalendar;
