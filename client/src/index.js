import React from "react";
import { render } from "react-dom";
import throttle from 'lodash/throttle';
import WebFont from 'webfontloader';
import Routes from "./routes/routes";
import configureStore from "./store/configureStore";
import {loadState, saveState} from "./utils/localStorage";
import './main.css';
global.Promise = require("bluebird");
Promise.config({ cancellation: true });
WebFont.load({
  google: {
    families: [
      'Source Sans Pro:400,600',
      'Quicksand:300,400,500,700'
    ]
  }
});
const persistedState = loadState();
const store = configureStore(persistedState);

store.subscribe(
  throttle(() => {
    saveState({
      ...store.getState(),
    }, 'state');
  }, 1000)
);

render(<Routes store={store} />, document.getElementById("root"));
