import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Dashboard/Home";
import Signup from "./pages/Signup/signup";
import SubmitRequest from "./pages/Submitrequest/Submitrequest";
import RequestHistory from "./pages/Requesthistory/requesthistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/requests/new" element={<SubmitRequest />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/requests" element={<RequestHistory/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
