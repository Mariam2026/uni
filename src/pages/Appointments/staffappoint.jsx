import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import StaffAppointList from "../../components/StaffAppointList/staffappointlist";
import "../Dashboard/Layout.css"; 
export default function StaffAppoint() {
     const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const studentName = storedUser.name || "Student Name";
      const profilePic = storedUser.profilePic || "";
      return (
        <div className="dashboard-layout">
          <Navbar studentName={studentName} profilePic={profilePic} />
          <div className="body-container">
            <Sidebar />
            <main className="main-content">
                <StaffAppointList />
            </main>
          </div>
        </div>
      );
}
