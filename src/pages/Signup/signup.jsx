import "./signup.css"
import Navbarsignup from "../../components/NavbarSignup/navbarsignup";
import SignupForm from "../../components/Signupform/signupform";

export default function Signup() {
  return (
    <>
      <Navbarsignup />
      <div className="signup-form">
        <SignupForm />
      </div>
    </>
  );
}
