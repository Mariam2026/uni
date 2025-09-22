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
        const today = new Date().toISOString().split("T")[0]; 

        // 🔹 Fetch requests
        const reqRes = await fetch( "http://localhost:8080/api/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const reqData = await reqRes.json();

        // Filter only today's requests
        const todaysRequests = reqData.filter(
          (r) =>
            new Date(r.createdDate).toISOString().split("T")[0] === today
        );
        setActiveRequests(todaysRequests.length);

        // 🔹 Fetch appointments
        const apptRes = await fetch("http://localhost:8080/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const apptData = await apptRes.json();

        if (!apptData.length) {
         
        } else {
          const todaysAppts = apptData.filter(
            (appt) =>
              new Date(appt.date).toISOString().split("T")[0] === today
          );

          if (!todaysAppts.length) {
           
          } else {
            setUpcomingAppointment(
              todaysAppts
                .map((appt) =>
                  new Date(appt.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                )
                .join(", ")
            );
          }
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
