import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import BookingForm from "../../components/BookingForm/bookingform";

const BookAppointment = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const studentName = storedUser.name || "Student Name";
    const profilePic = storedUser.profilePic || "";
    return (
      <div className="dashboard-layout">
        <Navbar studentName={studentName} profilePic={profilePic} />
        <div className="body-container">
            <Sidebar />
            <main className="main-content">
                <BookingForm />
            </main>
        </div>
    </div>
  );
};

export default BookAppointment;
