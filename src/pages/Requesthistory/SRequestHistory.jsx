import Navbar from "../../components/Navbar/Navbar";
import StaffRequestHistory from "../../components/RequestHistorylist/StaffRequestHistory";
import StaffStatsSection from "../../components/Stats/StaffStatsSection";
import StaffSidebar from "../../components/Sidebar/StaffSidebar";
import "../Dashboard/Layout.css"; 

export default function SRequestHistory() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const studentName = storedUser.name || "Student Name";
  const profilePic = storedUser.profilePic || "";

  return (
    <div className="dashboard-layout">
      <Navbar studentName={studentName} profilePic={profilePic} />
      <div className="body-container">
        <StaffSidebar />
        <main className="main-content">
          <StaffRequestHistory />
        </main>
      </div>
    </div>
  );
}
