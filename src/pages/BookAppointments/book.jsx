import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import BookingForm from "../../components/BookingForm/bookingform";

const BookAppointment = () => {
  return (
    <div className="dashboard-layout">
        <Navbar />
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
