import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { FOOTER } from './CONSTANTS';

const DialogFooter = ({ className, children }) => {
  // const last = children.length - 1;
  // const actions = React.Children.map(children, (_STATE, index) => {
  //   const isLastAction = last === index;
  //   const actionClasses = _STATE.props.className;
  //   const classes = classNames(actionClasses, FOOTER_BUTTON, {
  //     [FOOTER_BUTTON_CANCEL]: !isLastAction,
  //     [FOOTER_BUTTON_ACCEPT]: isLastAction,
  //   });
  //   return React.cloneElement(_STATE, {key: index, className: classes});
  // });

  return (
    <footer className={classNames(FOOTER, className)}>
      {children}
      {/*{actions}*/}
    </footer>
  );
};
DialogFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
export default DialogFooter;
