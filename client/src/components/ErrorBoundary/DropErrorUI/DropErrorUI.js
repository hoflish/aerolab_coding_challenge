import React from "react";
import PropTypes from "prop-types";
import { INFO } from "../../../actions/_constants";
import { Link } from "react-router-dom";
import DropErrorDescription from "./DropErrorDescription/DropErrorDescription";

export default function DropErrorUI(props) {
  const onAction = e => {
    if (e.isTrusted && !e.repeat) {
      action && action(e);
    }
  };
  let { dropError, link, action, actionText } = props;
  let dropErrorIcon;
  switch (dropError) {
    case INFO.OFFLINE:
      dropErrorIcon = "wifi_off";
      break;
    case INFO.TIMEOUT:
      dropErrorIcon = "alert_triangle";
      break;
    default:
      dropErrorIcon = "";
  }

  return (
    <div id="dropError">
      <DropErrorDescription
        dropErrorIcon={dropErrorIcon}
        errorDescription={props.errorDescription}
      />
      <div className="dropError-action">
        {action
          ? <button
              onClick={onAction}
              className="ellipsis dropError-uiAction btn defaultBtn"
            >
              {actionText}
            </button>
          : link && typeof link === "string"
              ? <Link to={link}>{actionText}</Link>
              : null}
      </div>
    </div>
  );
}

DropErrorUI.propTypes = {
  errorDescription: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  action: PropTypes.func,
  actionText: PropTypes.string,
  info: PropTypes.string,
  link: PropTypes.string,
  dropError: PropTypes.oneOf(["OFFLINE", "TIMEOUT"]).isRequired
};
