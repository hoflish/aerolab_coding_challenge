import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dialog, DialogHeader, DialogBody } from "../Dialog";
import Spinner from "../Spinner/Spinner";
import "./fund-dialog.css";

class FundDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAmount: "1000"
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleAmountChange(e) {
    this.setState({
      selectedAmount: e.target.value
    });
  }

  handleFormSubmit(evt) {
    evt.preventDefault();
    const { submitfund } = this.props;
    submitfund && submitfund(evt, this.state.selectedAmount);
  }

  render() {
    const {
      open,
      onClose,
      title,
      _scrollable,
      isUpdating,
      hasError,
      ...otherProps
    } = this.props;
    return (
      <Dialog open={open} onClose={onClose} {...otherProps}>
        {/* Dialog header */}
        <DialogHeader>
          <a role="button" onClick={onClose}>
            <span className="icon-x" />
          </a>
        </DialogHeader>

        {/* Dialog body */}
        <DialogBody className="fund-dialog__content" scrollable={_scrollable}>
          {/*Dialog Body*/}
          {/* TODO: refactoring this condition chain... bad code! */}
          {hasError
            ? <div className="hasError">
                <span>{hasError}</span>
              </div>
            : null}
          <h1>Choose an amount:</h1>
          <form onSubmit={this.handleFormSubmit}>
            <div className="radio-field">
              <label>
                <input
                  type="radio"
                  value="1000"
                  checked={this.state.selectedAmount === "1000"}
                  onChange={this.handleAmountChange}
                />
                1000 Pts
              </label>
            </div>
            <div className="radio-field">
              <label>
                <input
                  type="radio"
                  value="5000"
                  checked={this.state.selectedAmount === "5000"}
                  onChange={this.handleAmountChange}
                />
                5000 Pts
              </label>
            </div>
            <div className="radio-field">
              <label>
                <input
                  type="radio"
                  value="7500"
                  checked={this.state.selectedAmount === "7500"}
                  onChange={this.handleAmountChange}
                />
                7500 Pts
              </label>
            </div>
            <button
              disabled={isUpdating}
              className="btn primaryBtn"
              type="submit"
            >
              {isUpdating ? <Spinner size={"small"} /> : "Submit"}
            </button>
          </form>
          {/* End Dialog Body*/}
        </DialogBody>
      </Dialog>
    );
  }
}

FundDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  _scrollable: PropTypes.bool,
  onAction: PropTypes.func,
  isUpdating: PropTypes.bool
};

FundDialog.defaultProps = {};

export default FundDialog;
