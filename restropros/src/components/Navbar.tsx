import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex flex-row justify-between p-4 fixed w-full top-0 bg-white opacity-95 z-50">
      <Link to="/">
        <img src={Logo} alt="icon" className="w-[7rem]" />
      </Link>
      <ul className="flex gap-9">
        <Link
          to="/"
          className="btnGrey cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            (document.getElementById("feature") as HTMLElement).scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          Feature
        </Link>
        <Link
          to="/"
          className="btnGrey cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            (document.getElementById("pricing") as HTMLElement).scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          Pricing
        </Link>
        <Link to="/contact" className="btnGrey cursor-pointer">
          Contact
        </Link>
      </ul>
      <div className="flex gap-3">
        <button className="btnGrey">Login</button>
        <button className="btnGreen">Get Started</button>
      </div>
    </div>
  );
};

export default Navbar;
