// @flow
import type { Action } from "../actionTypes";
import type { User } from "../ObjectTypes";

export const user_login = "user/login";

export const user_me_request = "user/me/request";
export const user_me_success = "user/me/success";
export const user_me_failed = "user/me/failed";

export const user_points_request = "user/points/request";
export const user_points_updated = "user/points/updated";
export const user_points_failed = "user/points/failed";


export const loginSuccess = (_accessToken: string): Action => {
  return {
    type: user_login,
    isLoggedIn: !!_accessToken,
  };
};

export const userMeRequest = (): Action => {
  return {
    type: user_me_request,
  };
};

export const userMeSuccess = (userData: User): Action => {
  return {
    type: user_me_success,
    user: userData,
  };
};

export const userMeFailed = (error: Error): Action => {
  return {
    type: user_me_failed,
    hasError: error,
  };
};

export const userPointsRequest = (): Action => {
  return {
    type: user_points_request,
  };
};

export const userPointsUpdated = (amount): Action => {
  return {
    type: user_points_updated,
    newAmount: amount,
  };
};

export const userPointsFailed = (error): Action => {
  return {
    type: user_points_failed,
    hasError: error,
  };
};

