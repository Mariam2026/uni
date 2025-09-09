import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiFileText } from "react-icons/fi";
import "./RequestHistory.css";
import { FiPlusCircle } from "react-icons/fi";

export default function RequestHistoryList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Mock data (remove when API works)
    const mockData = [
      { id: 1, title: "Transcript", status: "Pending", createdAt: "2025-09-07T12:30:00Z" },
      { id: 2, title: "Transcript", status: "Pending", createdAt: "2025-09-06T15:45:00Z" },
      { id: 3, title: "Transcript", status: "Pending", createdAt: "2025-09-05T09:10:00Z" }
    ];
    setRequests(mockData);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="req">
      <div className="header-row">
        <h2>My Requests</h2>
          <Link to="/requests/new" className="create-link">
    <span className="plus">+</span> Create New Request
  </Link>        
      </div>

      <div className="requests-list">
        {requests.map((req) => (
            <div key={req.id} className="request-card">
  <div className="request-info">
     <FiFileText className="request-icon" size={30} />  
    <div className="request-text">
      <span className="title">{req.title}</span>
      <span className="time">{formatDate(req.createdAt)}</span>
    </div>
  </div>
  <span className={`status ${req.status.toLowerCase()}`}>
    {req.status}
  </span>
</div>
        
        ))}
      </div>
    </div>
  );
}
