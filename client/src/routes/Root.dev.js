import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DevTools from "../components/DevTools";
import App from "../components/App/App";
import Login from "../components/Login/Login";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";


const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
        <ErrorBoundary>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="*" component={() => <div>Error404</div>} />
          </Switch>
          <DevTools />
        </ErrorBoundary>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
