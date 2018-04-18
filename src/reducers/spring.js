import {SpringTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  timingBoxPlot: null,
  magnitudeBoxPlot: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_SPRING_TIMING_BP_OBJECT:
      return objectAssign({}, state, {timingBoxPlot: action.timing});

    case types.REMOVE_SPRING_TIMING_BP_OBJECT:
      return objectAssign({}, state, {timingBoxPlot: null});

    case types.FETCH_SPRING_MAGNITUDE_BP_OBJECT:
      return objectAssign({}, state, {magnitudeBoxPlot: action.magnitude});

    case types.REMOVE_SPRING_MAGNITUDE_BP_OBJECT:
      return objectAssign({}, state, {magnitudeBoxPlot: null});

    default:
      return state;
  }
}
