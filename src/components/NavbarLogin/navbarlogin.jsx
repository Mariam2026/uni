import "./navbarlogin.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
export default function Navbarlogin() {
  return (
    <nav class="navbar">
      <div class="container-fluid">
        <a class="unilink">
          <img src={logo} alt="UniLink logo" />
        </a>
        <Link to={"/"}>
          <a href="#" className="login-link">
            Sign-up
          </a>
        </Link>
      </div>
    </nav>
  );
}
