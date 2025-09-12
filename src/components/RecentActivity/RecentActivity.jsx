import React, { useEffect, useState } from "react";
import { FiFileText, FiCalendar, FiBell } from "react-icons/fi";
import "./RecentActivity.css";

export default function RecentActivity() {
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch requests
        const reqRes = await fetch("http://localhost:8080/api/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const requests = await reqRes.json();

        // Fetch appointments
        const appRes = await fetch("http://localhost:8080/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const appointments = await appRes.json();

        // Fetch notifications
        const notifRes = await fetch("http://localhost:8080/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const notifications = await notifRes.json();

        // Transform everything into a shared format
        const reqActivities = requests.map((r) => ({
          type: "request",
          description: `Submitted a request for ${r.type}`,
          time: r.createdDate,
        }));

        const appActivities = appointments.map((a) => ({
          type: "appointment",
          description: "Booked an appointment with the SA Staff",
          time: a.createdAt,
        }));

        const notifActivities = notifications.map((n) => ({
          type: "notification",
          description: n.message,
          time: n.timestamp,
        }));

        // Merge & sort by latest
        const merged = [...reqActivities, ...appActivities, ...notifActivities];
        merged.sort((a, b) => new Date(b.time) - new Date(a.time));

        setRecentActivity(merged);
      } catch (err) {
        console.error("Error fetching recent activity:", err);
      }
    };

    fetchActivity();
  }, []);

  // Format time in local format (date + time)
  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="recent-activity">
     
      <ul>
        {recentActivity.length === 0 ? (
          <li>No recent activity</li>
        ) : (
          recentActivity.map((item, index) => (
            <li key={index} className="activity-item">
              <div className="activity-left">
                {item.type === "request" && <FiFileText />}
                {item.type === "appointment" && <FiCalendar />}
                {item.type === "notification" && <FiBell />}
                <span className="activity-desc">{item.description}</span>
              </div>
              <span className="activity-time">{formatTime(item.time)}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
