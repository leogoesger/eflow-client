import {KnowIssueTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  knownIssues: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_KNOWN_ISSUE_OBJECTS:
      return objectAssign({}, state, {knownIssues: action.knownIssues});

    default:
      return state;
  }
}
