import React from "react";
import { render } from "react-dom";
import throttle from 'lodash/throttle';
import Routes from "./routes/routes";
import configureStore from "./store/configureStore";
import {loadState, saveState} from "./utils/localStorage";
import './main.css';

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
