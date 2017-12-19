// @flow
import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
  account: accountReducer,
  product: productReducer,
});

export default rootReducer;
