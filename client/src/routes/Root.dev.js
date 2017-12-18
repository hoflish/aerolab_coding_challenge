import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DevTools from "../components/DevTools";

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={() => <div>Main page</div>} />
          <Route path="/login" component={() => <div>Login page</div>} />
          <Route path="*" component={() => <div>Error404</div>} />
        </Switch>
        <DevTools />
      </div>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;