import _ from 'lodash';
import {
  MODIFY_FAVORITE,
  FETCH_RECOMMENDATIONS_SUCCEEDED,
} from '../constants';

export default function moviecard(state = { recs: [], favs: [] }, action) {
  switch (action.type) {
    case FETCH_RECOMMENDATIONS_SUCCEEDED: {
      return {
        ...state,
        recs: action.recommendations,
      };
    }
    case MODIFY_FAVORITE: {
      const newId = action.payload.value;
      const newFavs = _.get(state, 'favs').slice();
      if (!_.includes(newFavs, newId)) {
        newFavs.push(newId);
      } else {
        _.remove(newFavs, (item) => _.isEqual(item, newId));
      }
      return {
        ...state,
        favs: newFavs,
      };
    }
    default:
      return state;
  }
}
