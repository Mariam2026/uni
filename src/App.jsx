import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Dashboard/Home";
import StaffHome from "./pages/Dashboard/SHome";
import Signup from "./pages/Signup/signup";
import SubmitRequest from "./pages/Submitrequest/Submitrequest";
import RequestHistory from "./pages/Requesthistory/requesthistory";
import Login from "./pages/Login/login";
import ResetPassword from "./pages/ResetPassword/resetpassword";
import ChangePassword from "./pages/ChangePassword/changepassword";
import Bookinglist from "./pages/Appointments/Bookinglist";
import NotificationHistory from "./pages/Notification/NotificationHistory";
import BookAppointment from "./pages/BookAppointments/book";
import SHome from "./pages/Dashboard/SHome";
import SRequestHistory from "./pages/Requesthistory/SRequestHistory";
import SLogin from "./pages/Login/SLogin";
import SEditRequest from "./pages/Submitrequest/SEditRequest";
import Profile from "./pages/Profile/profile";
import EditProfile from "./pages/EditProfile/editprofile";
import StaffAppoint from "./pages/Appointments/staffappoint";
import ManageAppoint from "./pages/ManageAppointments/manage";
import AddUpdates from "./pages/AddUpdates/addupdates";
import Sprofile from "./pages/Profile/Sprofile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/staff" element={<SLogin />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/dashboard/staff" element={<SHome />} />
        <Route path="/requests/new" element={<SubmitRequest />} />
        <Route path="/requests" element={<RequestHistory />} />
        <Route path="/appointments" element={<Bookinglist />} />
        <Route path="/appointments/book" element={<BookAppointment />} />
        <Route path="/requests/staff" element={<SRequestHistory />} />
        <Route path="/requests/manage" element={<SEditRequest />} /> {/* ✅ fix */}
        <Route path="/notifications" element={<NotificationHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/staff" element={<Sprofile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/appointments/staff" element={<StaffAppoint />} />
        <Route path="/appointments/staff/manage" element={<ManageAppoint />} />
        <Route path="/addupdates" element={<AddUpdates />} />
      </Routes>
    </Router>
  );
}

export default App;
