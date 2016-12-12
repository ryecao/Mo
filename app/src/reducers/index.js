import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import search from './search';
import moviecard from './moviecard';

export default combineReducers({
  search,
  user,
  runtime,
  moviecard,
});
