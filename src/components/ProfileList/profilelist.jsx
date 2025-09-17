import { useState } from "react";
import "./profilelist.css";
import { Link } from "react-router-dom";

export default function ProfileList() {
  const [profile, setProfile] = useState({
    id: "20220000",
    name: "Student Name",
    email: "student.name@university.edu",
    phone: "(123) 456-7890",
    address: "123 University Ave, City, State, Zip",
    department: "AI",
  });

  return (
    <div className="profile-container px-4">
      <h2 className="profile-title">Profile</h2>

      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-icon">👤</span>
        </div>
        <Link to={"/profile/edit"}>
          <button className="edit-btn">Edit</button>
        </Link>
      </div>

      <div className="profile-card">
        <h3 className="profile-card-title">Profile Details</h3>

        <div className="profile-row">
          <span className="label">ID</span>
          <span className="value">{profile.id}</span>
        </div>

        <div className="profile-row">
          <span className="label">Name</span>
          <span className="value">{profile.name}</span>
        </div>

        <div className="profile-row">
          <span className="label">Email</span>
          <span className="value">{profile.email}</span>
        </div>

        <div className="profile-row">
          <span className="label">Phone</span>
          <span className="value">{profile.phone}</span>
        </div>

        <div className="profile-row">
          <span className="label">Address</span>
          <span className="value">{profile.address}</span>
        </div>

        <div className="profile-row">
          <span className="label">Department</span>
          <span className="value">{profile.department}</span>
        </div>
      </div>
    </div>
  );
}
