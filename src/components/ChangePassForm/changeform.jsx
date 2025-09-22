import { useState } from "react";
import axios from "axios";
import "./changeform.css";

export default function ChangeForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // saved at login
      const role = localStorage.getItem("role"); // "STUDENT" or "STAFF"

      const endpoint =
        role === "STAFF"
          ? "/api/auth/staff/change-password"
          : "/api/auth/student/change-password";

      const res = await axios.post(
        endpoint,
        { newPassword }, // must match ChangePasswordRequest in backend
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error changing password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card change-card">
        <h3 className="text-center fw-bold head">Change Password</h3>
        <p className="text-center text-muted">Enter your new password below</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Change Password
          </button>
        </form>

        {message && <p className="text-center mt-3">{message}</p>}

        <div className="text-center mt-3">
          <a href="/login" className="text-decoration-none">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
