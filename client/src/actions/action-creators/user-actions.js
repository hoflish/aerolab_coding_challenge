// @flow
import type { Action } from "../actionTypes";
import type { User } from "../ObjectTypes";

export const user_login = "user/login";

export const user_me_request = "user/me/request";
export const user_me_success = "user/me/success";
export const user_me_failed = "user/me/failed";


export const loginSuccess = (_accessToken: string): Action => {
  return {
    type: user_login,
    isLoggedIn: !!_accessToken,
  };
};

