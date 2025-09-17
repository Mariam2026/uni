import { useState, useEffect } from "react";
import { FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // ✅ import
import "./RequestHistory.css";

export default function StaffRequestHistory() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const navigate = useNavigate(); // ✅ initialize navigate

  // Filter states
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/requests", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Requests from API:", data);
        setRequests(data);
        setFilteredRequests(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const handleViewDoc = (doc) => {
    if (!doc) {
      alert("No document attached.");
      return;
    }

    let byteArray;
    if (typeof doc === "string") {
      const byteCharacters = atob(doc);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      byteArray = new Uint8Array(byteNumbers);
    } else {
      byteArray = new Uint8Array(doc);
    }

    const blob = new Blob([byteArray], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  // 🔹 Apply filters
  useEffect(() => {
    let filtered = [...requests];

    if (typeFilter) {
      filtered = filtered.filter(
        (r) => r.type?.toLowerCase() === typeFilter.toLowerCase()
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(
        (r) => r.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (dateFilter) {
      filtered = filtered.filter(
        (r) =>
          new Date(r.createdDate).toLocaleDateString() ===
          new Date(dateFilter).toLocaleDateString()
      );
    }

    if (search) {
      filtered = filtered.filter(
        (r) =>
          r.title?.toLowerCase().includes(search.toLowerCase()) ||
          r.studentName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredRequests(filtered);
  }, [typeFilter, statusFilter, dateFilter, search, requests]);

  return (
    <div className="req">
      <div className="header-row">
        <h2>All Requests</h2>
        {/* 🔹 Search bar */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search by Title or Student Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🔹 Filters */}
      <div className="filters">
        <select onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">Filter By Request Type</option>
          <option value="Transcript">Transcript</option>
          <option value="ID Renewal">ID Renewal</option>
          <option value="Housing">Housing</option>
        </select>

        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Filter By Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <input type="date" onChange={(e) => setDateFilter(e.target.value)} />
      </div>

      <div className="requests-list">
        {filteredRequests.map((req) => (
          <div key={req.requestID} className="request-card">
            <div className="request-info">
              <FiFileText className="request-icon" size={30} />
              <div className="request-text">
                <span className="title">{req.type?.toUpperCase()}</span>
                <span className="time">{formatDate(req.createdDate)}</span>
                {/* 🔹 Show Student Name */}
                <span className="student">Student: {req.studentName || "N/A"}</span>
              </div>
            </div>

            <span className={`status ${req.status?.toLowerCase()}`}>
              {req.status}
            </span>

            <button className="doc-btn" onClick={() => handleViewDoc(req.document)}>
              View Document
            </button>

            {/* 🔹 Navigate to edit page with requestId */}
            <button
              className="select-btn"
              onClick={() =>
                navigate("/requests/manage", { state: { requestId: req.requestID } })
              }
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
