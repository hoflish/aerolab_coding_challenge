import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BODY, SCROLLABLE } from './CONSTANTS';

const DialogBody = ({ className, children, scrollable, ...otherProps }) => {
  return (
    <section
      className={classNames(
        BODY,
        {
          [SCROLLABLE]: scrollable,
        },
        className
      )}
      {...otherProps}
    >
      {children}
    </section>
  );
};
DialogBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  scrollable: PropTypes.bool,
};
export default DialogBody;
