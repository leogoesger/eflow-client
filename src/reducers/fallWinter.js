import {FallWinterTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  magnitudeBoxPlot: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_FALL_WINTER_MAGNITUDE_BP_OBJECT:
      return objectAssign({}, state, {magnitudeBoxPlot: action.magnitude});

    case types.REMOVE_FALL_WINTER_MAGNITUDE_BP_OBJECT:
      return objectAssign({}, state, {magnitudeBoxPlot: null});

    default:
      return state;
  }
}
