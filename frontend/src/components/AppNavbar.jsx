import { Navbar, NavbarBrand, NavbarText } from "reactstrap";
import { IoIosSettings } from "react-icons/io";

export const AppNavbar = () => {
  return (
    <>
      <div>
        <Navbar>
          <NavbarBrand href="/">Compound</NavbarBrand>
          <NavbarText>
            <IoIosSettings size={25} className="me-2" />
          </NavbarText>
        </Navbar>
      </div>
    </>
  );
};
