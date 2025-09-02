import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Dashboard/Home";


function App() {
  return (
    <Router>
      <Routes>
      

      
        <Route path="/dashboard" element={<Home />} />
        
      </Routes>
    </Router>
  );
}

export default App;