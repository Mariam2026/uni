import ManageAppointList from "../../components/ManageAppointList/manageappoint";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../Dashboard/Layout.css"; 
export default function ManageAppoint() {
     const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const studentName = storedUser.name || "Student Name";
      const profilePic = storedUser.profilePic || "";
      return (
        <div className="dashboard-layout">
          <Navbar studentName={studentName} profilePic={profilePic} />
          <div className="body-container">
            <Sidebar />
            <main className="main-content">
                <ManageAppointList />
            </main>
          </div>
        </div>
      );
}
