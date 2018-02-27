import { ClassTypes as types } from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  classes: null,
  class: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_CLASSES_OBJECT:
      return objectAssign({}, state, { classes: null });

    default:
      return state;
  }
}
