import {MemberTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  members: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_MEMBER_OBJECTS:
      return objectAssign({}, state, {members: action.members});

    default:
      return state;
  }
}
