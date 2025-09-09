import "./changeform.css";

export default function ChangeForm() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card change-card">
        <h3 className="text-center fw-bold head">Change Password</h3>
        <p className="text-center text-muted">Enter your new password below</p>

        <form>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm New Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Change Password
          </button>
        </form>

        <div className="text-center mt-3">
          <a href="#" className="text-decoration-none">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
