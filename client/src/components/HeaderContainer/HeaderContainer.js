import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import http from "../../services/http";
import CONFIG from "../../config/app";
import helpers from "../../helpers";
import {
  userPointsUpdated,
  userPointsRequest,
  userPointsFailed
} from "../../actions/action-creators/user-actions";
import { INFO } from "../../actions/_constants";
import Header from "./Header/Header";
import Spinner from "../Spinner/Spinner";
import FundDialog from "../FundDialog/FundDialog";

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.onOpenFundDialog = this.onOpenFundDialog.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onOpenFundDialog() {
    this.setState({
      open: true
    });
  }
  onClose() {
    this.setState({
      open: false
    });
  }

  onFund(amount) {
    const self = this;
    this.props.dispatch(userPointsRequest());
    return new Promise((resolve, reject) => {
      return http
        .post("user/points", { amount: parseInt(amount, 10) })
        .then(response =>
          response.json().then(newAmount => ({ newAmount, response })))
        .then(({ newAmount, response }) => {
          if (!response.ok) {
            reject(newAmount);
          } else {
            resolve(newAmount);
          }
        });
    })
      .timeout(5e3)
      .then(newAmount => {
        self.props.dispatch(userPointsUpdated(newAmount));
        self.setState({
          open: false,
        })
        return null;
      })
      .catch(err => {
        // TODO: handle drop errors
        if (err instanceof Promise.TimeoutError) {
          console.log(err);
        }
        self.props.dispatch(userPointsFailed(err.message));
        console.log(err);
      })
      .finally(() => {
        console.log("done");
      });
  }

  onSubmitFund(evt, requestedAmount) {
    const { newAmount } = this.props;
    // have no other way to access new points
    const nextAmount = newAmount["New Points"] + parseInt(requestedAmount, 10);
    if (nextAmount > CONFIG.AMOUNT_LIMIT) {
      this.setState({
        opState: INFO.LIMIT
      });
      _.delay(
        () => {
          this.setState({
            open: false
          });
        },
        2e3
      );
      return;
    } else {
      this.onFund(requestedAmount);
    }
  }

  render() {
    const { user, isLoggedIn, isFetchingMe, hasError, isUpdating, newAmount } = this.props;
    const { open, opState } = this.state;
    if (isFetchingMe) {
      return <Spinner />;
    }
    return (
      <div>
        <Header
          user={user}
          isLoggedIn={isLoggedIn}
          onOpenDialog={this.onOpenFundDialog}
        />
        <FundDialog
          hasError={hasError}
          isUpdating={isUpdating}
          onAction={this.onSubmitFund.bind(this)}
          className="fund_dialog"
          open={open}
          onClose={this.onClose.bind(this)}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.account.isLoggedIn,
    user: state.account.user,
    isFetchingMe: state.account.isFetchingMe,
    hasError: state.account.hasError,
    isUpdating: state.account.isUpdating,
    newAmount: state.account.newAmount,
  };
}

export default withRouter(connect(mapStateToProps)(HeaderContainer));
