import { combineReducers } from 'redux';
import { clothesActionTypes, basketActionTypes } from '../actions/actionTypes';
import { getDataReducer } from './utils';

export default combineReducers({
  clothes: getDataReducer({ actionTypes: clothesActionTypes }),
  basket: getDataReducer({ actionTypes: basketActionTypes }),
});
