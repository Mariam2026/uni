import Navbar from "../../components/Navbar/Navbar";
import BookingHistory from "../../components/bookinghistorylist/bookinglist";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../Dashboard/Layout.css"; 
export default function Bookinglist() {
     const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const studentName = storedUser.name || "Student Name";
      const profilePic = storedUser.profilePic || "";
      return (
        <div className="dashboard-layout">
          <Navbar studentName={studentName} profilePic={profilePic} />
          <div className="body-container">
            <Sidebar />
            <main className="main-content">
              
             <BookingHistory />
            </main>
          </div>
        </div>
      );



}