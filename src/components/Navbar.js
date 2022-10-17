import "../styles/navbar.css";
import "../styles/reset.css";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="nav">
        <Link to="/">
          <span className="fi">learn</span>
          <span className="se">SBAR</span>
        </Link>
      </nav>
    </>
  );
};
export default Navbar;
