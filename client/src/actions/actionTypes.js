//@flow
import type { User, Product } from "./ObjectTypes";

export type Action =
  /*---------------------------
    Dealing with user account.
    ----------------------------*/
  | { type: "user/login", isLoggedIn: boolean }
  | { type: "user/me/request" }
  | { type: "user/me/success", user: User }
  | { type: "user/me/failed", error: Error };
