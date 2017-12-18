import React from 'react';
import PropTypes from 'prop-types';
import './InputField.css';

const InputField = props => {
  const { className, action, ...otherProps } = props;

  function onAction(e) {
    e.preventDefault();
    if (e.isTrusted && !e.repeat) {
      action && action(e);
    }
  }

  return (
    <input
      onChange={onAction}
      className="input"
      {...otherProps}
    />
  );
};

InputField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password']).isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  action: PropTypes.func,
  className: PropTypes.string,
};


export default InputField;
