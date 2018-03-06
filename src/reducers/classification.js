import {ClassificationTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  classifications: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_CLASSIFICATION_OBJECTS:
      return objectAssign({}, state, {classifications: action.classifications});

    default:
      return state;
  }
}
