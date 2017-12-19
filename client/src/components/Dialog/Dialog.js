import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Set as ImmutableSet } from 'immutable';
import { MDCDialogFoundation } from '@material/dialog/dist/mdc.dialog';
import * as DIALOG_CLASSES from './CONSTANTS';
import classNames from 'classnames';
import '@material/dialog/dist/mdc.dialog.css';
import './dialog.css';

class Dialog extends PureComponent {
  state = {
    classes: new ImmutableSet(),
    animating: false,
  };

  foundation = new MDCDialogFoundation({
    addClass: className =>
      this.setState(prevState => ({
        classes: prevState.classes.add(className),
      })),
    removeClass: className =>
      this.setState(prevState => ({
        classes: prevState.classes.remove(className),
      })),
    addBodyClass: className => document.body.classList.add(className),

    removeBodyClass: className => document.body.classList.remove(className),

    eventTargetHasClass: (target, className) =>
      target.classList.contains(className),

    registerInteractionHandler: (evt, handler) =>
      this.dialog.addEventListener(evt, handler),

    deregisterInteractionHandler: (evt, handler) =>
      this.dialog.removeEventListener(evt, handler),

    registerSurfaceInteractionHandler: (evt, handler) =>
      this.dialogSurface.addEventListener(evt, handler),

    deregisterSurfaceInteractionHandler: (evt, handler) =>
      this.dialogSurface.removeEventListener(evt, handler),

    registerDocumentKeydownHandler: handler =>
      document.addEventListener('keydown', handler),

    deregisterDocumentKeydownHandler: handler =>
      document.removeEventListener('keydown', handler),

    registerTransitionEndHandler: handler =>
      this.dialogSurface.addEventListener('transitionend', handler),

    deregisterTransitionEndHandler: handler =>
      this.dialogSurface.removeEventListener('transitionend', handler),

    notifyAccept: () => this.emit(DIALOG_CLASSES.FOOTER_BUTTON_ACCEPT),

    notifyCancel: () => {
      let event = new Event(DIALOG_CLASSES.FOOTER_BUTTON_CANCEL);
      document.dispatchEvent(event);
    },

    trapFocusOnSurface: () => this.focusTrap_.activate(),

    untrapFocusOnSurface: () => this.focusTrap_.deactivate(),

    isDialog: el => el === this.dialogSurface,
  });

  componentDidMount() {
    this.foundation.init();
  }

  componentWillUnmout() {
    this.foundation.destroy();
  }

  componentWillReceiveProps({ open: nextProps }) {
    const { open } = this.props;
    const onOpen = !open && nextProps;
    const onClose = open && !nextProps;
    if (onOpen) {
      this.setState({ animating: true });
      document.body.classList.add(DIALOG_CLASSES.SCROLL_LOCK);
      document.addEventListener('keydown', e => {
        this.handleKeyDown(e);
      });
    } else if (onClose) {
      this.setState({ animating: true });
      document.body.classList.remove(DIALOG_CLASSES.SCROLL_LOCK);
      document.removeEventListener('keydown', e => {
        this.handleKeyDown(e);
      });
    }
  }

  handleKeyDown(event) {
    const { onClose } = this.props;
    const isEscape =
      event.key && (event.key === 'Escape' || event.keyCode === 27);
    if (onClose && isEscape) {
      onClose();
    }
  }

  render() {
    const {
      className,
      children,
      onClose,
      open,
      style,
      ...otherProps
    } = this.props;
    const ariaHiddenProp = open ? {} : { 'aria-hidden': true };
    const dialogClasses = classNames(
      DIALOG_CLASSES.ROOT,
      {
        [DIALOG_CLASSES.ANIMATING]: this.state.animating,
        [DIALOG_CLASSES.OPEN]: open,
      },
      className
    );

    return (
      <aside
        ref={el => {
          this.dialog = el;
        }}
        className={dialogClasses}
        role="dialog"
        onClick={e => {
          if (onClose) onClose(e);
        }}
        onTransitionEnd={() => {
          this.setState({ animating: false });
        }}
        {...ariaHiddenProp}
        {...otherProps}
      >
        <div
          ref={el => {
            this.dialogSurface = el;
          }}
          style={style}
          className={DIALOG_CLASSES.SURFACE}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
        <div className={DIALOG_CLASSES.BACKDROP}> </div>
      </aside>
    );
  }
}

Dialog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default Dialog;
