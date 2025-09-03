import "./navbarlogin.css";
import logoImage from "../../assets/logo.png";
export default function Navbar({ studentName, profilePic }) {
  return (
    <header className="navbar">
          <div className="nav-left">
            <img 
              src={logoImage} 
              alt="UniLink Logo" 
              style={{ height: 40 }}
            />
          </div>
          <div className="nav-right">
            <a href="#" className="login-link">Login</a>
          </div>
        </header>
  );
}
