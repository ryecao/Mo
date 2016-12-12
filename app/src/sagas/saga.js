import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import {
  MODIFY_FAVORITE,
  FETCH_RECOMMENDATIONS_SUCCEEDED,
  FETCH_RECOMMENDATIONS_FAILED,
} from '../constants';

function f(data) {
  return fetch(`/api/v1.0/movie/${_.join(data, ',')}/5`, {
    method: 'GET',
    'content-type': 'text/json',
  }).then(res => res.json());
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchRecommendation() {
  try {
    const state = yield select();
    const recommendations = yield call(f, state.moviecard.favs);
    yield put({ type: FETCH_RECOMMENDATIONS_SUCCEEDED, recommendations });
  } catch (e) {
    yield put({ type: FETCH_RECOMMENDATIONS_FAILED, message: e.message });
  }
}

/*
 Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
 Allows concurrent fetches of user.
 */
function* saga() {
  yield takeEvery(MODIFY_FAVORITE, fetchRecommendation);
}

export default saga;
