import { Link } from "react-router-dom";
import "./signupform.css";

export default function SignupForm() {
  return (
    <div class="container">
      <div class="form-container">
        <h3 class="text-center form-title">Join UniLink</h3>
        <p class="text-center text-muted mb-4">
          Create your account to get started
        </p>

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
              type="email"
              class="form-control"
              placeholder="Email address"
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
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="Confirm password"
              required
            />
          </div>
          <div class="form-check mb-3">
            <input type="checkbox" class="form-check-input" id="adminCheck" />
            <label for="adminCheck" class="form-check-label">
              Sign up as admin
            </label>
          </div>
          <button type="submit" class="btn btn-primary w-100">
            Sign Up
          </button>
        </form>

        <div class="text-center mt-3">
          <small>
            Already have an account?{" "}
            <Link to={"/login"}>
              <a>Login</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
