import {ReleaseNoteTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  releaseNotes: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_RELEASE_NOTE_OBJECTS:
      return objectAssign({}, state, {releaseNotes: action.releaseNotes});

    default:
      return state;
  }
}
