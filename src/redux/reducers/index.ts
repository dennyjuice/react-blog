import { combineReducers } from 'redux';
import articles from './articles';
import userState from './userState';

export default combineReducers({
  articles,
  userState,
});
