import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import "./Dashboard.css";

export default function ReportsAnalytics() {
  const [requests, setRequests] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch Requests
    fetch("http://localhost:8080/api/requests", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error(err));

    // Fetch Appointments
    fetch("http://localhost:8080/api/appointments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error(err));
  }, []);

  // --- Totals ---
  const totalRequests = requests.length;
  const totalAppointments = appointments.length;

  // --- Group by status ---
  const statusCounts = requests.reduce((acc, req) => {
    acc[req.status] = (acc[req.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(statusCounts).map((status) => ({
    name: status,
    value: statusCounts[status],
  }));

  // Fixed colors for each status
  const STATUS_COLORS = {
    APPROVED: "#4CAF50", // green
    PENDING: "#FF9800",  // orange
    REJECTED: "#F44336", // red
    DEFAULT: "#2196F3",  // blue for others
  };

  // --- Group by day ---
  const dailyCounts = requests.reduce((acc, req) => {
    const day = new Date(req.createdDate).toLocaleDateString();
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(dailyCounts).map((day) => ({
    day,
    count: dailyCounts[day],
  }));

  return (
    <div className="dashboard">
      <h2>Reports & Analytics</h2>

      {/* Totals */}
      <div className="stats-row">
        <div className="stat-box">
          <h3>Total Requests</h3>
          <p>{totalRequests}</p>
        </div>
        <div className="stat-box">
          <h3>Total Appointments</h3>
          <p>{totalAppointments}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-row">
        <div className="chart">
          <h3>Request Status Breakdown</h3>
          <PieChart width={350} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={STATUS_COLORS[entry.name?.toUpperCase()] || STATUS_COLORS.DEFAULT}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>

        <div className="chart">
          <h3>Requests per Day</h3>
          <BarChart width={400} height={300} data={barData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
