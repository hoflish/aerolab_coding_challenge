import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import Header from "./Header/Header";

class HeaderContainer extends Component {

  render() {
    const {user, isLoggedIn} = this.props;
    return <Header user={user} isLoggedIn={isLoggedIn} />;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.account.isLoggedIn,
    user: state.account.user,
  };
}

export default withRouter(connect(mapStateToProps)(HeaderContainer));
