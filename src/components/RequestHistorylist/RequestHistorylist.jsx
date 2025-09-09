import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiFileText } from "react-icons/fi";
import "./RequestHistory.css";

export default function RequestHistoryList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/requests", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Requests from API:", data);
        setRequests(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const handleViewDoc = (doc) => {
  if (!doc) {
    alert("No document attached.");
    return;
  }

  let byteArray;

  if (typeof doc === "string") {
    // If backend sends Base64
    const byteCharacters = atob(doc);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    byteArray = new Uint8Array(byteNumbers);
  } else {
    // If backend sends JSON array of numbers
    byteArray = new Uint8Array(doc);
  }

  const blob = new Blob([byteArray], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
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
          <div key={req.requestID} className="request-card">
            <div className="request-info">
              <FiFileText className="request-icon" size={30} />
              <div className="request-text">
                <span className="title">{req.type?.toUpperCase()}</span>
                <span className="time">{formatDate(req.createdDate)}</span>
              </div>
            </div>

            <span className={`status ${req.status?.toLowerCase()}`}>
              {req.status}
            </span>

            
            <button
              className="doc-btn"
              onClick={() => handleViewDoc(req.document)}
            >
              View Document
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
