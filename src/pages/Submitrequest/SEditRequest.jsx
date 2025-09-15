import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import StaffEditRequest from "../../components/Submitrequest/StaffEditRequest";
import StaffSidebar from "../../components/Sidebar/StaffSidebar";
 // ✅ edit form
import "../Dashboard/Layout.css";

export default function SEditRequest() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const studentName = storedUser.name || "Student Name";
  const profilePic = storedUser.profilePic || "";

  return (
    <div className="dashboard-layout">
      <Navbar studentName={studentName} profilePic={profilePic} />
      <div className="body-container">
        <StaffSidebar />
        <main className="main-content">
          <StaffEditRequest /> {/* ✅ staff can edit requests here */}
        </main>
      </div>
    </div>
  );
}
