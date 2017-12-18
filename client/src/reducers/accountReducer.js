// @flow
import {user_login} from '../actions/action-creators/user-actions';
import type { Action } from '../actions/actionTypes';

let initialState = {
  isLoggedIn: false,
  user: {},
};

export default function accountReducer(state: Object = initialState, action: Action) {
  switch (action.type) {
    case user_login:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    default:
      return state;
  }
}
