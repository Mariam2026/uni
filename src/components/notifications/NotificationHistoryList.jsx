import { useState, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import "./NotificationHistory.css";

export default function NotificationHistoryList() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/notifications", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch notifications");
        return res.json();
      })
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

  // ✅ New function to mark a notification as read
  const markAsRead = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/notifications/${id}/read`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to mark notification as read");

      // Update state locally so UI updates immediately
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="notif">
      <div className="header-row">
        <h2>Notifications</h2>
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p>No notifications found.</p>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notification-card ${notif.read ? "read" : "unread"}`}
              onClick={() => !notif.read && markAsRead(notif.id)} // 👈 click to mark as read
              style={{ cursor: "pointer" }}
            >
              <div className="notification-info">
                <FiBell className="notification-icon" size={30} />
                <div className="notification-text">
                  <span className="title">{notif.title?.toUpperCase()}</span>
                  <span className="message">{notif.message}</span>
                  <span className="time">{formatDate(notif.timestamp)}</span>
                </div>
              </div>

              <span className={`status ${notif.read ? "read" : "unread"}`}>
                {notif.read ? "Read" : "Unread"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
