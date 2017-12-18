import React from 'react';
import {string} from 'prop-types';
import './HeaderItem.css';

const HeaderItem = ({className, children}) => {

  return (
    <div className={`HeaderItem ${className}`}>
      {children}
    </div>
  );
}

HeaderItem.propTypes = {
  className: string,
};

HeaderItem.defaultProps = {
  className: "",
}

export default HeaderItem;
