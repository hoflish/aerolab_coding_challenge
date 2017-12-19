import React from 'react';
import PropTypes from 'prop-types';
import './Spinner.css';

export default function Spinner({size}) {
  return (
    <div className={size === "small" ? "sk-three-bounce-small" : "sk-three-bounce"}>
        <div className="sk-child sk-bounce1"></div>
        <div className="sk-child sk-bounce2"></div>
        <div className="sk-child sk-bounce3"></div>
      </div>
  );
}

Spinner.propTypes = {
  size: PropTypes.string,
};

Spinner.defaultProps = {};
