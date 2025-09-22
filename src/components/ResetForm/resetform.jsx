import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./resetform.css";

export default function ResetForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const res = await axios.post(
  "http://localhost:8080/api/auth/forgot-password",
  { email }
);

    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending reset link");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card">
        <h3 className="text-center fw-bold head">Reset Password</h3>
        <p className="text-center text-muted">
          Enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Send Reset Link
          </button>
        </form>

        {message && <p className="text-center mt-3">{message}</p>}

        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-none">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
