import {PaperTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  papers: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_PAPER_OBJECTS:
      return objectAssign({}, state, {papers: action.papers});

    default:
      return state;
  }
}
