import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import CONFIG from "../../config/app";
import http from "../../services/http";
import { loadState } from "../../utils/localStorage";
import {
  userMeRequest,
  userMeSuccess,
  userMeFailed
} from "../../actions/action-creators/user-actions";
import helpers from "../../helpers";
import { INFO } from "../../actions/_constants";
import EH from "../../libs/errors-handler";
import HeaderContainer from "../HeaderContainer/HeaderContainer";
import MainContainer from "../MainContainer/MainContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: undefined
    };
    this.attempts = 0;
    this._promise = null;
  }

  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.handleUserDataResponse();
    } else {
      this.props.history.push("/login");
    }
  }

  getUserData() {
    return http
      .get("user/me")
      .then(response => response.json().then(user => ({ user, response })))
      .then(({ user, response }) => {
        if (!response.ok) {
          return Promise.reject(user);
        }
        return Promise.resolve(user);
      });
  }

  handleUserDataResponse() {
    const self = this;
    this.props.dispatch(userMeRequest());
    new Promise((resolve, reject) => {
      return self.getUserData().then(user => {
        if (!_.isEmpty(user)) {
          return resolve(user);
        }
        return reject(user);
      });
    })
      .timeout(CONFIG.TIMEOUT_DURATION)
      .then(user => {
        self.props.dispatch(userMeSuccess(user));
        return null;
      })
      .catch(err => {
        if (err instanceof Promise.TimeoutError) {
          helpers.checkOnline().then(res => {
            if (!res) {
              this.setState({
                info: INFO.OFFLINE
              });
            } else {
              if (++this.attempts > 2) {
                this.setState({
                  info: INFO.TIMEOUT
                });
                this._promise && this._promise.cancel();
              } else {
                this.attempts++;
                this._promise = this.handleUserDataResponse();
              }
            }
          });
          self.props.dispatch(userMeFailed(""));
          return null;
        }
        // handle other errors...
        self.props.dispatch(userMeFailed(err.message));
        console.log(err);
        return null;
      })
      .finally(() => {
        console.log("handling userData response: done!");
      });
  }

  componentDidMount() {
    window.addEventListener("storage", this.cleanLocalStorage);
  }

  cleanLocalStorage(e) {
    const accessToken = loadState("accessToken");
    if (accessToken === undefined) {
      window.location.reload();
    }
  }

  componentWillUnmount() {
    this._promise && this._promise.cancel();
    window.removeEventListener("storage", () => _.noop);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.newAmount !== this.props.newAmount ||
      nextProps.redeemedItem !== this.props.redeemedItem
    ) {
      this.handleUserDataResponse();
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    const { info } = this.state;
    switch (info) {
      case INFO.OFFLINE:
        throw new EH.InternetConnError();
      case INFO.TIMEOUT:
        throw new EH.InternalError();
      default:
        return (<div>
          <HeaderContainer />
          <MainContainer />
          {/*<Footer />*/}
        </div>);
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.account.isLoggedIn,
    newAmount: state.account.newAmount,
    redeemedItem: state.product.redeemedItem
  };
}

export default withRouter(connect(mapStateToProps)(App));
