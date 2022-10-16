import "../styles/navbar.css";
import "../styles/reset.css";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav class="nav">
        <Link to="/">
          <span class="fi">learn</span>
          <span class="se">SBAR</span>
        </Link>
      </nav>
    </>
  );
};
export default Navbar;
