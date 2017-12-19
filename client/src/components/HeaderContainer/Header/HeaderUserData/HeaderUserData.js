import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './HeaderUserData.css';

const HeaderUserData = ({ user, onOpenDialog }) => {
   function onAction(e) {
    if (e.isTrusted && !e.repeat) {
      onOpenDialog && onOpenDialog(e);
    }
  }
  return (
    <div className="HeaderUser">
      {/* user's points */}
      <div className="HeaderUser__points">
        <span className="header__points-visibility">
          <span>Available Points:</span>
          <span className="headerUser__currentPts">
            {" "}{` +${user.points} Pts`}
          </span>
        </span>
      </div>
      <div className="HeaderUser__fund">
        <button onClick={onAction} className="btn fundBtn defaultBtn">
          Fund your account
        </button>
      </div>
      <span className="sep" />
      <Link to="/me" className="HeaderUser__profileLink">
        {/* Avatar */}
        {/*<Avatar
          src={user.avatarUrl ? user.avatarUrl : null/*defaultAvatar*/}
        {/* Username */}
        <span className="headerUser__name">{user.name}</span>
      </Link>
    </div>
  );
};

HeaderUserData.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    points: PropTypes.number,
    redeemHistory: PropTypes.array,
    createDate: PropTypes.string
  })
};

HeaderUserData.defaulProps = {};

export default HeaderUserData;
