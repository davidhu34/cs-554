import { combineReducers } from 'redux';
import { clothesActionTypes } from '../actions/actionTypes';
import { getDataReducer } from './utils';

export default combineReducers({
  clothes: getDataReducer({ actionTypes: clothesActionTypes }),
});
