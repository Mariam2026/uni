import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Dashboard/Home";
import Signup from "./pages/Signup/signup";
import SubmitRequest from "./pages/Submitrequest/Submitrequest";
import RequestHistory from "./pages/Requesthistory/requesthistory";
import Login from "./pages/Login/login";
import ResetPassword from "./pages/ResetPassword/resetpassword";
import ChangePassword from "./pages/ChangePassword/changepassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/requests/new" element={<SubmitRequest />} />
        <Route path="/requests" element={<RequestHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
