import StaffSidebar from "../../components/Sidebar/StaffSidebar";
import Navbar from "../../components/Navbar/Navbar";
import ProfileList from "../../components/ProfileList/profilelist";

const Sprofile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const studentName = storedUser.name || "Student Name";
    const profilePic = storedUser.profilePic || "";
    return (
      <div className="dashboard-layout">
        <Navbar studentName={studentName} profilePic={profilePic} />
        <div className="body-container">
            <StaffSidebar />
            <main className="main-content">
                <ProfileList />
            </main>
        </div>
    </div>
  );
};

export default Sprofile;