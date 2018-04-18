import {FallTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  timingBoxPlot: null,
  magnitudeBoxPlot: null,
  timingWetBoxPlot: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_FALL_TIMING_BP_OBJECT:
      return objectAssign({}, state, {timingBoxPlot: action.timing});

    case types.REMOVE_FALL_TIMING_BP_OBJECT:
      return objectAssign({}, state, {timingBoxPlot: null});

    case types.FETCH_FALL_MAGNITUDE_BP_OBJECT:
      return objectAssign({}, state, {magnitudeBoxPlot: action.magnitude});

    case types.REMOVE_FALL_MAGNITUDE_BP_OBJECT:
      return objectAssign({}, state, {magnitudeBoxPlot: null});

    case types.FETCH_FALL_TIMING_WET_BP_OBJECT:
      return objectAssign({}, state, {timingWetBoxPlot: action.timing});

    case types.REMOVE_FALL_TIMING_WET_BP_OBJECT:
      return objectAssign({}, state, {timingWetBoxPlot: null});

    default:
      return state;
  }
}
