import { useEffect, useState } from "react";
import { FaCommentAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import QuickActions from "../../components/QuickActions/QuickActions";
import StatsSection from "../../components/Stats/StatsSection";
import RecentActivity from "../../components/RecentActivity/RecentActivity";
import "./Layout.css";


export default function Home() {
  const [activeRequests, setActiveRequests] = useState(0);
  const [upcomingAppointment, setUpcomingAppointment] = useState("No upcoming");

  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const studentName = storedUser.name || "Student Name";
  const profilePic = storedUser.profilePic || "";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchData = async () => {
      try {
        // Fetch active requests
        const reqRes = await fetch("http://localhost:8080/api/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const reqData = await reqRes.json();
        setActiveRequests(reqData.length);

        // Fetch appointments
        const apptRes = await fetch("http://localhost:8080/api/appointments", {
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

  const goToChatbot = () => {
    navigate("/chatbot");
  };

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
          <h3>Recent Activity</h3>
          <RecentActivity />
        </main>
      </div>

      {/* Floating Chatbot Icon */}
      <div className="chatbot-float" onClick={goToChatbot}>
        <FaCommentAlt />
      </div>
    </div>
  );
}
