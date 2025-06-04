import { Navbar, NavbarBrand, NavbarText } from "reactstrap";
import { IoIosSettings } from "react-icons/io";

export const AppNavbar = () => {
  return (
    <>
      <div>
        <Navbar>
          <NavbarBrand href="/" className="fw-bold text-color">
            NotSeen
          </NavbarBrand>
          <NavbarText>
            <IoIosSettings size={25} className="me-2 text-color" />
          </NavbarText>
        </Navbar>
      </div>
    </>
  );
};
