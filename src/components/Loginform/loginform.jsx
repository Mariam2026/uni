import { Link } from "react-router-dom";
import "./loginform.css";

export default function LoginForm() {
  return (
    <div class="container">
      <div class="form-container">
        <h3 class="text-center form-title">Login</h3>
        <p class="text-center text-muted mb-4">Login to your account</p>

        <form>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              required
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div class="form-check mb-3">
            <input type="checkbox" class="form-check-input" id="adminCheck" />
            <label for="adminCheck" class="form-check-label">
              Remember me
            </label>
          </div>
          <button type="submit" class="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div class="text-center mt-3">
          <small>
            <Link to={"/resetpassword"}>
              <a>Forgot password?</a>
            </Link>
          </small>
        </div>

        <div class="text-center mt-3">
          <small>
            Don't have an account?{" "}
            <Link to={"/"}>
              <a href="#">Sign-Up</a>{" "}
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
