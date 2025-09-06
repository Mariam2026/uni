import LoginForm from "../../components/Loginform/loginform";
import Navbarlogin from "../../components/NavbarLogin/navbarlogin";

export default function Login() {
  return (
    <>
      <Navbarlogin />
      <div className="login-form">
        <LoginForm />
      </div>
    </>
  );
}
