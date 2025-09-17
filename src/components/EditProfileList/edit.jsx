import { useState } from "react";
import "./edit.css";

export default function EditProfileList() {
  const [formData, setFormData] = useState({
    name: "Student Name",
    email: "student.name@university.edu",
    phone: "(123) 456-7890",
    address: "123 University Ave, City, State, Zip",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
  };

  return (
    <div className="edit-profile-container px-4">
      <h2 className="edit-title">Edit Profile</h2>

      <div className="edit-header">
        <div className="edit-avatar">
          <span className="avatar-icon">👤</span>
        </div>
        <button className="confirm-btn" onClick={handleSubmit}>
          Confirm
        </button>
      </div>

      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}
