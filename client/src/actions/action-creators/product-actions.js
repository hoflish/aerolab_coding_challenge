// @flow
import type { Action } from "../actionTypes";

export const products_ids_loaded = "products/ids/loaded";
export const products_ids_loadError = "products/ids/load-error";

export const products_pages_current = "products/pages/current"; // pagination
export const products_sort = "products/sort";

export const products_redeem_request = "products/redeem/request";
export const products_redeem_done = "products/redeem/done";
export const products_redeem_error = "products/redeem/error";

export const productIdsLoaded = (ids: Array<string>): Action => {
  return {
    type: products_ids_loaded,
    productIds: ids,
  };
};

export const productIdsError = (error: Error): Action => {
  return {
    type: products_ids_loadError,
    error: error,
  };
};

export const paginateProducts = (numberOfPage: number): Action => {
  return {
    type: products_pages_current,
    page: numberOfPage,
  };
};

export const sortProducts = (sortValue: string): Action => {
  return {
    type: products_sort,
    sortValue: sortValue,
  };
};

export const redeemProductRequest = (): Action => {
  return {
    type: products_redeem_request,
  };
};

export const redeemProductDone = (redeemedItem: string): Action => {
  return {
    type: products_redeem_done,
    redeemedItem: redeemedItem,
  };
};

export const redeemProductError = (error: Error): Action => {
  return {
    type: products_redeem_error,
    redeemError: error,
  };
};
