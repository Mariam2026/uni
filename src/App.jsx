import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Dashboard/Home";
import Signup from "./pages/Signup/signup";


function App() {
  return (
    <Router>
      <Routes>
      

      
        <Route path="/dashboard" element={<Home />} />
        
        <Route path="/" element={<Signup />} />

      </Routes>
    </Router>
  );
}

export default App;