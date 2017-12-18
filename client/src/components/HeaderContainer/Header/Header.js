import React from "react";
import PropTypes from "prop-types";
import HeaderItem from "./HeaderItem/HeaderItem";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import HeaderUserGuest from "./HeaderUserGuest/HeaderUserGuest";
import HeaderUserData from "./HeaderUserData/HeaderUserData";
import "./Header.css";

const Header = ({ user, isLoggedIn }) => {
  return (
    <header>
      <div className="header">
        <HeaderItem>
          <HeaderLogo />
        </HeaderItem>
         <HeaderItem>
           {isLoggedIn
            ? <HeaderUserData user={user} />
            : <HeaderUserGuest className="HeaderLink" />}
         </HeaderItem>
      </div>
    </header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    points: PropTypes.number,
    redeemHistory: PropTypes.array,
    createDate: PropTypes.string
  })
};

export default Header;
