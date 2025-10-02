import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signupform.css";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    faculty: "",
    department: "",
    phoneNumber: "",
    address: "",
    gender: "",
    dob: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/student/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Signup failed");
      const data = await res.json();

      console.log("Signup successful:", data);

      // Save token + role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Save user info so Home.jsx can show the student’s name
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          profilePic: "", // can update later when uploading a pic
        })
      );

      // Redirect to dashboard
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error signing up: " + err.message);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h3 className="text-center form-title">Join UniLink</h3>
        <p className="text-center text-muted mb-4">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email address"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
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
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                className="form-control"
                placeholder="Faculty"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-control"
                placeholder="Department"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="form-control"
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
                placeholder="Address"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account? <Link to="/login">Login</Link>
          </small>
        </div>
      </div>
    </div>
  );
}
