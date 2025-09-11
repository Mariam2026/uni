import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import "./NotificationHistory.css";

export default function NotificationHistoryList() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Notifications from API:", data);
        setNotifications(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="notif">
      <div className="header-row">
        <h2>Notifications</h2>
        
      </div>

      <div className="notifications-list">
        {notifications.map((notif) => (
          <div key={notif.notificationID} className="notification-card">
            <div className="notification-info">
              <FiBell className="notification-icon" size={30} />
              <div className="notification-text">
                <span className="title">{notif.title?.toUpperCase()}</span>
                <span className="time">{formatDate(notif.createdDate)}</span>
              </div>
            </div>

            <span className={`status ${notif.status?.toLowerCase()}`}>
              {notif.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
