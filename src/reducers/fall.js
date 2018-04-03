import {FallTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  fallData: [],
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_FALL_DATA_OBJECT:
      return objectAssign({}, state, {fallData: action.fallData});

    case types.REMOVE_FALL_DATA_OBJECT:
      return objectAssign({}, state, {fallData: action.fallData});

    default:
      return state;
  }
}
