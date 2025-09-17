import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Submitrequest.css";

export default function StaffEditRequest() {
  const [status, setStatus] = useState("Pending");
  const [comment, setComment] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // 🔹 Check if requestId was passed from history page
  const selectedRequestId = location.state?.requestId || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRequestId) {
      alert("Please pick a request first.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/api/requests/${selectedRequestId}`,
        { status, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Request updated successfully!");
      navigate("/requests/staff"); // go back after update
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to update request");
    }
  };

  return (
    <div className="req">
      <form onSubmit={handleSubmit}>
        <div className="header-row">
          <h2>Edit Request</h2>
           <button
          type="button"
          className="doc"
          onClick={() => navigate("/requests/staff", { state: { fromEdit: true } })}
        >
          Pick a Request
        </button>

        </div>

        

        {selectedRequestId && (
          <>
            <p>
              Editing Request ID: <b>{selectedRequestId}</b>
            </p>

            <h2 className="type">Request Status</h2>
            <select
              className="requestType"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <h2 className="t">Comment/Note</h2>
            <textarea
              className="desType"
              placeholder="Enter a note or description..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <button type="submit" className="sub">
              Update
            </button>
          </>
        )}
      </form>
    </div>
  );
}
