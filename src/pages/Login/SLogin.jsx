import StaffLoginForm from "../../components/Loginform/StaffLoginForm";

import Navbarlogin from "../../components/NavbarLogin/navbarlogin";

export default function SLogin() {
  return (
    <>
      <Navbarlogin />
      <div className="login-form">
        <StaffLoginForm />
      </div>
    </>
  );
}
