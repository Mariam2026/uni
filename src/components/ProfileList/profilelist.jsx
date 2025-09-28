import { useState, useEffect } from "react";
import "./profilelist.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProfileList() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Missing token");
          return;
        }

        const res = await axios.get("http://localhost:8080/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <p>Loading profile...</p>;
  }

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
          <span className="value">{profile.phoneNumber}</span>
        </div>

        <div className="profile-row">
          <span className="label">Address</span>
          <span className="value">{profile.address}</span>
        </div>

        {profile.department && (
          <div className="profile-row">
            <span className="label">Department</span>
            <span className="value">{profile.department}</span>
          </div>
        )}
      </div>
    </div>
  );
}

