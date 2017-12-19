// @flow
import {
  products_ids_loaded,
  products_ids_loadError,
  products_pages_current,
  products_sort,
  products_redeem_request,
  products_redeem_done,
  products_redeem_error
} from "../actions/action-creators/product-actions";
import type { Action } from "../actions/actionTypes";

let initialState = {
  productIds: [],
  page: 1,
  sortValue: "most-recent",
  redeemedItem: undefined,
  redeemError: undefined,
  redeemRequested: false
};

// TODO: this reducer has relatively a long switch case,
//  so need to split it to other reducers and combine them
//  (reducer to manage products and another one to manage single product item)
export default function productReducer(
  state: Object = initialState,
  action: Action
) {
  switch (action.type) {
    case products_ids_loaded:
      return {
        ...state,
        productIds: action.productIds
      };
    case products_ids_loadError:
      return {
        ...state,
        loadIdsError: action.error
      };
    case products_pages_current:
      return {
        ...state,
        page: action.page
      };
    case products_sort:
      return {
        ...state,
        sortValue: action.sortValue
      };
    case products_redeem_request:
      return {
        ...state,
        redeemRequested: true
      };
    case products_redeem_done:
      return {
        ...state,
        redeemRequested: false,
        redeemedItem: action.redeemedItem,
        redeemError: undefined,
      };
    case products_redeem_error:
      return {
        ...state,
        redeemRequested: false,
        redeemError: action.redeemError
      };
    default:
      return state;
  }
}
