import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import StaffSidebar from "../../components/Sidebar/StaffSidebar";
import StaffQuickActions from "../../components/QuickActions/StaffQuickActions";
import StaffStatsSection from "../../components/Stats/StaffStatsSection";
import StaffRecentActivity from "../../components/RecentActivity/StaffRecentActivity";
import "./Layout.css";

export default function SHome() {
  const [activeRequests, setActiveRequests] = useState(0);
  const [upcomingAppointment, setUpcomingAppointment] = useState("No upcoming");

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const studentName = storedUser.name || "Student Name";
  const profilePic = storedUser.profilePic || "";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchData = async () => {
      try {
        // Fetch active requests
        const reqRes = await fetch("", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const reqData = await reqRes.json();
        setActiveRequests(reqData.length);

        // Fetch appointments
        const apptRes = await fetch("", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const apptData = await apptRes.json();

        if (!apptData.length) {
          setUpcomingAppointment("No upcoming");
        } else {
          const now = new Date();
          const upcoming = apptData
            .filter(appt => new Date(appt.date) >= now)
            .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

          setUpcomingAppointment(
            upcoming
              ? ` ${new Date(upcoming.date).toLocaleDateString()}`
              : "No upcoming"
          );
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-layout">
      <Navbar studentName={studentName} profilePic={profilePic} />
      <div className="body-container">
        <StaffSidebar />
        <main className="main-content">
          <h2>Dashboard</h2>
          <StaffQuickActions />
          <StaffStatsSection
            activeRequests={activeRequests}
            upcomingAppointment={upcomingAppointment}
          />
          <h3>Recent Activity</h3>
          <StaffRecentActivity />
        </main>
      </div>
    </div>
  );
}
