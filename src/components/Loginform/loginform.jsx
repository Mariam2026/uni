import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./loginform.css";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();

      // Save token + role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Try to get the name from signup (if stored) or fallback to email
      const signupUser = JSON.parse(localStorage.getItem("signupUser")) || {};
      const name = signupUser.name || formData.email;

      localStorage.setItem("user", JSON.stringify({ email: formData.email, name }));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login error: " + err.message);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h3 className="text-center form-title">Login</h3>
        <p className="text-center text-muted mb-4">Login to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Password"
              required
            />
          </div>

          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="rememberCheck" />
            <label htmlFor="rememberCheck" className="form-check-label">
              Remember me
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            <Link to="/resetpassword">Forgot password?</Link>
          </small>
        </div>

        <div className="text-center mt-3">
          <small>
            Don&apos;t have an account?{" "}
            <Link to="/signup">Sign-Up</Link>
          </small>
        </div>
      </div>
    </div>
  );
}
