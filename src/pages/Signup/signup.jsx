import "./signup.css"
import Navbarlogin from "../../components/NavbarLogin/navbarlogin";
import SignupForm from "../../components/Signupform/signupform";

export default function Signup() {
  return (
    <>
      <Navbarlogin />
      <div className="signup-form">
        <SignupForm />
      </div>
    </>
  );
}
