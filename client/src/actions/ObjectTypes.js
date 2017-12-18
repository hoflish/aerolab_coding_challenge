// @flow
export type User = {
  _id: string,
  name: string,
  points: number,
  redeemHistory: Array<any>,
  createDate: string,
};

export type Product = {
  _id: string,
  name: string,
  cost: number,
  category: string,
  img: {
    url: string,
    hdUrl: string,
  }
};
