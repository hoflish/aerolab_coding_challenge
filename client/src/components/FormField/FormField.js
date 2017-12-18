import React from 'react';
import PropTypes from 'prop-types';
import './FormField.css';

const FormField = ({children, className}) => {
  return (
    <div className="FormField">
      {children}
    </div>
  );
};

FormField.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};


export default FormField;
