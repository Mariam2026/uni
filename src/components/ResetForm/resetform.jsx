import { Link } from "react-router-dom";
import "./resetform.css";

export default function ResetForm() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card">
        <h3 className="text-center fw-bold head">Reset Password</h3>
        <p className="text-center text-muted">
          Enter your email to reset your password
        </p>

        <form>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to={"/login"}>
            <a className="text-decoration-none">Back to Login</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
