import logoImage from "../../assets/logo.png";
import "./Navbar.css";
export default function Navbar({ studentName, profilePic }) {
  return (
    <header className="normal-navbar">
      <div className="nav-left">
        <img 
          src={logoImage} 
          alt="UniLink Logo" 
          style={{ height: 40 }}  
        />
      </div>
      <div className="nav-right">
        <span>{studentName}</span>
        <img
          src={profilePic || ""}
          alt="profile"
          style={{ width: 30, height: 30, borderRadius: "50%" }}
        />
      </div>
    </header>
  );
}
