//@flow
import type { User, Product } from "./ObjectTypes";

export type Action =
  /*---------------------------
    Dealing with user account.
    ----------------------------*/
    { type: "user/login", isLoggedIn: boolean }

  | { type: "user/me/request" }
  | { type: "user/me/success", user: User }
  | { type: "user/me/failed", hasError: Error }

  // update user points
  | { type: 'user/points/request'}
  | { type: 'user/points/updated', newAmount: Object}
  | { type: 'user/points/failed', hasError: Error}

   /*---------------------------
    Dealing with Product ids.
    ----------------------------*/
  | { type: "products/ids/loaded", ids: Array<string> }
  | { type: "products/ids/load-error", error: Error }
  | { type: "products/pages/current", page: number }
  | { type: "products/sort", sortValue: string }

  | { type: 'products/redeem/request'}
  | { type: 'products/redeem/done', redeemedItem: string}
  | { type: 'products/redeem/error', redeemError: Error};
