/* eslint-disable import/prefer-default-export */

import { MODIFY_FAVORITE } from '../constants';

export function modifyFavorite({ value }) {
  return {
    type: MODIFY_FAVORITE,
    payload: {
      value,
    },
  };
}

