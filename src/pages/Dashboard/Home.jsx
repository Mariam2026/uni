import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import QuickActions from "../../components/QuickActions/QuickActions";
import StatsSection from "../../components/Stats/StatsSection";
import RecentActivity from "../../components/RecentActivity/RecentActivity";
import "./Layout.css";

export default function Home() {
  const [activeRequests, setActiveRequests] = useState(0);
  const [upcomingAppointment, setUpcomingAppointment] = useState("No upcoming");

  
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const studentName = storedUser.name || "Student Name";
  const profilePic = storedUser.profilePic || "";

  useEffect(() => {
  
    fetch("")
      .then((res) => res.json())
      .then((data) => setActiveRequests(data.length))
      .catch((err) => console.error("Error fetching requests:", err));

    fetch("")
      .then((res) => res.json())
      .then((data) => setUpcomingAppointment(data.date || "No upcoming"))
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  return (
    <div className="dashboard-layout">
      <Navbar studentName={studentName} profilePic={profilePic} />
      <div className="body-container">
        <Sidebar />
        <main className="main-content">
          <h2>Dashboard</h2>
          <QuickActions />
          <StatsSection
            activeRequests={activeRequests}
            upcomingAppointment={upcomingAppointment}
          />
          <h3>Recent  Activity</h3>
          <RecentActivity />
        </main>
      </div>
    </div>
  );
}