/* eslint-disable import/prefer-default-export */

import { SET_SEARCH_KEYWORD, SET_SEARCH_STRINGS, SET_BASIC_INFO } from '../constants';

export function setSearchKeyword({ name, value }) {
  return {
    type: SET_SEARCH_KEYWORD,
    payload: {
      name,
      value,
    },
  };
}

export function setSearchStrings({ name, value }) {
  return {
    type: SET_SEARCH_STRINGS,
    payload: {
      name,
      value,
    },
  };
}

export function setBasicInfo({ name, value }) {
  return {
    type: SET_BASIC_INFO,
    payload: {
      name,
      value,
    },
  };
}
