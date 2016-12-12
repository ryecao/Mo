import _ from 'lodash';
import { SET_SEARCH_KEYWORD, SET_SEARCH_STRINGS, SET_BASIC_INFO } from '../constants';

export default function search(state = { matchedIndices: [] }, action) {
  switch (action.type) {
    case SET_SEARCH_KEYWORD: {
      const matchedIndices = _.filter(_.map(state.search_strings,
        (l, i) => {
          if (_.includes(l, _.toLower(action.payload.value.replace(/\W/g, '')))) return i;
          return -1;
        }), (l) => l >= 0);
      return {
        ...state,
        matchedIndices,
        [action.payload.name]: action.payload.value,
      };
    }
    case SET_SEARCH_STRINGS:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case SET_BASIC_INFO:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
}
