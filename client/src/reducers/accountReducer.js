// @flow
import {
  user_login,
  user_me_request,
  user_me_success,
  user_me_failed,
  user_points_request,
  user_points_updated,
  user_points_failed,
} from "../actions/action-creators/user-actions";
import type { Action } from "../actions/actionTypes";

let initialState = {
  isLoggedIn: false,
  isFetchingMe: false,
  hasError: undefined,
  user: {},
  isUpdating: false,
  newAmount: {},
};

export default function accountReducer(
  state: Object = initialState,
  action: Action
) {
  switch (action.type) {
    case user_login:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };
    case user_me_request:
      return {
        ...state,
        isFetchingMe: true
      };
    case user_me_success:
      return {
        ...state,
        isFetchingMe: false,
        hasError: undefined,
        user: action.user
      };
    case user_me_failed:
      return {
        ...state,
        isFetchingMe: false,
        hasError: action.hasError
      };
     case user_points_request:
      return {
        ...state,
        isUpdating: true
      };
      case user_points_updated:
      return {
        ...state,
        newAmount: action.newAmount,
        isUpdating: false,
        hasError: undefined
      };
      case user_points_failed:
      return {
        ...state,
        isUpdating: false,
        hasError: action.hasError,
      };
    default:
      return state;
  }
}
