import Navbar from "../../components/Navbar/Navbar";
import NotificationHistoryList from "../../components/notifications/NotificationHistoryList";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../Dashboard/Layout.css"; 

export default function NotificationHistory() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const studentName = storedUser.name || "Student Name";
  const profilePic = storedUser.profilePic || "";

  return (
    <div className="dashboard-layout">
      <Navbar studentName={studentName} profilePic={profilePic} />
      <div className="body-container">
        <Sidebar />
        <main className="main-content">
          <NotificationHistoryList />
        </main>
      </div>
    </div>
  );
}
