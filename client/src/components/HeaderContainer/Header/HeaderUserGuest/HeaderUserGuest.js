import React from "react";
import { string } from "prop-types";
import { Link } from "react-router-dom";
import "./HeaderUserGuest.css";

const HeaderUserGuest = ({className}) => {
  return (
    <Link to="/login" className={className}>
      Login
    </Link>
  );
};

HeaderUserGuest.propTypes = {
  className: string
};

HeaderUserGuest.defaulProps = {
  className: "",
}

export default HeaderUserGuest;
