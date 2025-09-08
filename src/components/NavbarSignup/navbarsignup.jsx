import "./navbarsignup.css";
import logo from "../../assets/logo.png";
export default function Navbarsignup() {
  return (
    <nav class="navbar">
      <div class="container-fluid">
        <a class="unilink">
          <img src={logo} alt="UniLink logo" />
        </a>
        <a href="#" className="login-link">
          Login
        </a>
      </div>
    </nav>
  );
}
