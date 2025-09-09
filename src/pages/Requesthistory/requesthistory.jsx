import Navbar from "../../components/Navbar/Navbar";
import RequestHistoryList from "../../components/RequestHistorylist/RequestHistorylist";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../Dashboard/Layout.css"; 
export default function RequestHistory() {
     const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const studentName = storedUser.name || "Student Name";
      const profilePic = storedUser.profilePic || "";
      return (
        <div className="dashboard-layout">
          <Navbar studentName={studentName} profilePic={profilePic} />
          <div className="body-container">
            <Sidebar />
            <main className="main-content">
              
              <RequestHistoryList/>
            </main>
          </div>
        </div>
      );



}