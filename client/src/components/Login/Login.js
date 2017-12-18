import React, { Component } from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {loginSuccess} from "../../actions/action-creators/user-actions";
import InputField from '../InputField/InputField';
import FormField from '../FormField/FormField';
import Spinner from "../Spinner/Spinner";
import helpers from "../../helpers";
import phrases from '../../phrases';
import CONFIG from "../../config/app";
//import Events from 'ampersand-events';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SHOW_CREDENTIALS: false,
      PROCESSING: false,
      hover: false,
      focus: false,
      hasError: undefined,
      username: "",
      password: ""
    };
    this._onlineCheck = null;

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleCredentialsVisibility = this.toggleCredentialsVisibility.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onCleanField = this.onCleanField.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onMouseEnter() {
    this.setState({ hover: true });
  }

  onMouseLeave() {
    this.setState({ hover: false });
  }

  onFocus() {
    this.setState({ focus: true });
  }

  onBlur() {
    this.setState({ focus: false });
  }

  static stopEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  onCleanField(e) {
    Login.stopEvent(e);
    this.setState({
      [e.target.dataset.field]: "",
      hover: false,
      focus: false,
    })
  }

  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/');
    }
  }

  toggleCredentialsVisibility(e) {
    e.preventDefault();
    this.setState(prevState => ({
      SHOW_CREDENTIALS: !prevState.SHOW_CREDENTIALS
    }));
  }

  handleUsernameChange(evt) {
    const currentState = { username: evt.target.value };
    if (this.state.hasError) {
      currentState.hasError = undefined;
    }
    this.setState(currentState);
  }

  handlePasswordChange(evt) {
    const currentState = { password: evt.target.value };
    if (this.state.hasError) {
      currentState.hasError = undefined;
    }
    this.setState(currentState);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const username = this.state.username.trim();
    const password = this.state.password.trim();

    if (username === "" || password === "") {
      this.setState({
        hasError: phrases("field_empty")
      });
      return;
    }

    this.onSend(username, password);
  }

  sendPayload(data) {
    return fetch("http://localhost:5000/api/auth", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });
  }

  onSend(username, password) {
    const credentials = Object.create(null);
    credentials.username = username;
    credentials.password = password;

    const self = this;
    this.setState({ PROCESSING: true });

     new Promise((resolve, reject) => {
      return self.sendPayload(credentials)
        .then(response =>
          response.json().then(accessToken => ({ accessToken, response }))
        )
        .then(({ accessToken, response }) => {
          if (!response.ok) {
            // to fix: "Warning: a promise was rejected with a non-error: [object Error]"
            const proxiedError = new Error();
            proxiedError.message = accessToken.message;
            proxiedError.stack = accessToken.stack;
            reject(proxiedError);
          } else {
            resolve(accessToken);
          }
        });
    })
      .timeout(CONFIG.TIMEOUT_DURATION)
      .then(function saveToken(token) {
        try {
          window.localStorage.setItem("accessToken", token.accessToken);
          return token;
        } catch (e) {
          return false;
        }
      })
      .then((token) => {
      if (token) {
        self.props.dispatch(loginSuccess(token));
        return null;
      } else {
        console.error("Storage: Could not store accessToken");
        return null;
      }
    })
      .catch(err => {
        // TODO: add internal attempts code...
        if (err instanceof Promise.TimeoutError) {
            this._onlineCheck = helpers.checkOnline().then(res => {
              if (!res) {
                self.setState({
                  PROCESSING: false,
                  password: "",
                  hasError: phrases("check_internet_connection").phrase,
                });
              }
              else {
                self.setState({
                  hasError: phrases("internal_error"),
                  password: "",
                  PROCESSING: false
                });
              }

            });
        }
        else {
          self.setState({
            hasError: err.message,
            PROCESSING: false,
            password: "",
          });

          console.log("Error: " + err);
        }
        return null;
      })
      .finally(() => {
        this._onlineCheck = null;
        console.log("done!");
      });
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn !== this.props.isLoggedIn) {
      this.setState(
        {
          username: "",
          password: "",
          PROCESSING: false
        },
        () => {
          this.props.history.push("/");
        }
      );
    }
  }

  componentWillUnmount() {
    this._onlineCheck && this._onlineCheck.cancel();
  }

  render() {
    const { SHOW_CREDENTIALS, PROCESSING, hasError, username, password } = this.state;
    return (
      <main id="loginPage" role="main">
        <div className="loginWrap">
          <div className="loginContent loginBox box">
            {/* Logo. TODO: create logo...  */}
            <div className="appLogo">
              <h1>Marketch</h1>
            </div>
            {/* Display errors */}
            {hasError !== undefined ? (
              <div className="hasError">
                <span>{hasError}</span>
              </div>
            ) : null}

            {/* show credentials*/}
            <div className="loginCreds" >
              <div className="creds">
                {!SHOW_CREDENTIALS ? <span>{phrases('missing_credentials')}</span> :
                  <span>
                    <ul>
                      <li>Username: <code>user123</code></li>
                      <li>Password: <code>secret</code></li>
                    </ul>
                  </span>
                }
              </div>
              <span><button onClick={this.toggleCredentialsVisibility} className="btn toggleCredsBtn defaultBtn">
                {SHOW_CREDENTIALS ? "Hide" : "Show"}
                </button></span>
            </div>
            <form id="loginForm" onSubmit={this.handleSubmit}>
              {/* Username field */}
              <FormField >
                <InputField
                  type="text"
                  name="username"
                  aria-label="Username"
                  aria-required="true"
                  placeholder="Username"
                  autoCapitalize="off"
                  autoCorrect="off"
                  action={this.handleUsernameChange}
                  value={username}
                />
                { username ?  <button /*TODO: fix tab bug*/
                  disabled={PROCESSING}
                  className="icon"
                  data-field="username"
                  onClick={this.onCleanField}
                  onMouseEnter={this.onMouseEnter}
                  onMouseLeave={this.onMouseLeave}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                >
                  <svg xmlns="http://www.w3.org/2000/svg"
                       width="16" height="16" viewBox="0 0 24 24"
                       fill="none" stroke="currentColor" strokeWidth="2"
                       strokeLinecap="round" strokeLinejoin="round"
                       className={this.state.hover || this.state.focus ? "feather-hovered" : "feather feather-x"} >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button> : null}
              </FormField>

              {/* Password field */}
              <FormField>
                <InputField
                  type="password"
                  name="password"
                  aria-label="Password"
                  aria-required="true"
                  placeholder="Password"
                  autoCapitalize="off"
                  autoCorrect="off"
                  action={this.handlePasswordChange}
                  value={password}
                />
                {password ?  <button
                  disabled={PROCESSING}
                  className="icon"
                  data-field="password"
                  onClick={this.onCleanField}
                  onMouseEnter={this.onMouseEnter}
                  onMouseLeave={this.onMouseLeave}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                >
                  <svg xmlns="http://www.w3.org/2000/svg"
                       width="16" height="16" viewBox="0 0 24 24"
                       fill="none" stroke="currentColor" strokeWidth="2"
                       strokeLinecap="round" strokeLinejoin="round"
                       className={this.state.hover || this.state.focus ? "feather-hovered" : "feather feather-x"} >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button> : null}
              </FormField>

              {/* Login button */}
              <span className="loginBtn">
                <button disabled={PROCESSING} type="submit" className="btn primaryBtn">
                  {PROCESSING ? <Spinner btnSpinner size={16} hasText="processing"/> : "Login"}
                </button>
              </span>
            </form>
          </div>

          <div className="divider" />
          {/* TODO: add social site links */}
          <div className="box loginFooter">
            <span>Made with love by Hassan CHABAB</span>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: state.account.isLoggedIn
});

export default withRouter(connect(mapStateToProps)(Login));
