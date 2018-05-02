import {UserTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  message: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_BROADCAST_MESSAGE:
      return objectAssign({}, state, {message: action.message});

    default:
      return state;
  }
}
