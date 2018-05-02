import {UserTypes as types} from '../action-types';

const fetchBroadCastMessageObject = message => {
  return {
    type: types.FETCH_BROADCAST_MESSAGE,
    message,
  };
};

export function fetchBroadCastMessage(message) {
  return dispatch => {
    dispatch(fetchBroadCastMessageObject(message));
  };
}
