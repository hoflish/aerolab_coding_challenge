import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { HEADER } from './CONSTANTS';

const DialogHeader = ({ className, children }) => (
  <header className={classNames(HEADER, className)}>{children}</header>
);

DialogHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default DialogHeader;
