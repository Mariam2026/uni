import "./navbarsignup.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
export default function Navbarsignup() {
  return (
    <nav class="navbar">
      <div class="container-fluid">
        <a class="unilink">
          <img src={logo} alt="UniLink logo" />
        </a>
        <Link to={"/login"}>
          <a href="#" className="login-link">
            Login
          </a>
        </Link>
      </div>
    </nav>
  );
}
