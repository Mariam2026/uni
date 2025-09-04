import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Dashboard/Home";
import Signup from "./pages/Signup/signup";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
      

      
        <Route path="/dashboard" element={<Home />} />
        

      </Routes>
    </Router>
  );
}

export default App;