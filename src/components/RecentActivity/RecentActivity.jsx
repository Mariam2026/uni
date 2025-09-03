import React, { useEffect, useState } from "react";
import { FiFileText, FiCalendar, FiBell } from "react-icons/fi";
import "./RecentActivity.css";

export default function RecentActivity() {
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then((data) => setRecentActivity(data))
      .catch((err) => console.error("Error fetching recent activity:", err));
  }, []);

  return (
    <div className="recent-activity">
    
      <ul>
        {recentActivity.length === 0 ? (
          <li>No recent activity</li>
        ) : (
          recentActivity.map((item, index) => (
            <li key={index}>
              {item.type === "request" && <FiFileText />}
              {item.type === "appointment" && <FiCalendar />}
              {item.type === "notification" && <FiBell />}
              {item.description} <span>{item.time}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}