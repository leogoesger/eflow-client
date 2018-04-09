import {SummerTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  timingBoxPlot: null,
  magnitude10BoxPlot: null,
  magnitude50BoxPlot: null,
  durationFlushBoxPlot: null,
  durationWetBoxPlot: null,
  noFlowCountsBoxPlot: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_SUMMER_TIMING_OBJECT:
      return objectAssign({}, state, {timingBoxPlot: action.timing});

    case types.REMOVE_SUMMER_TIMING_OBJECT:
      return objectAssign({}, state, {timingBoxPlot: null});

    case types.FETCH_SPRING_MAGNITUDE_10_OBJECT:
      return objectAssign({}, state, {magnitudeBoxPlot: action.magnitude});

    case types.REMOVE_SPRING_MAGNITUDE_10_OBJECT:
      return objectAssign({}, state, {magnitudeBoxPlot: null});

    case types.FETCH_SPRING_MAGNITUDE_50_OBJECT:
      return objectAssign({}, state, {magnitudeBoxPlot: action.magnitude});

    case types.REMOVE_SPRING_MAGNITUDE_50_OBJECT:
      return objectAssign({}, state, {magnitudeBoxPlot: null});

    case types.FETCH_SPRING_DURATION_FLUSH_OBJECT:
      return objectAssign({}, state, {
        durationFlushBoxPlot: action.duration,
      });

    case types.REMOVE_SPRING_DURATION_FLUSH_OBJECT:
      return objectAssign({}, state, {durationFlushBoxPlot: null});

    case types.FETCH_SPRING_DURATION_WET_OBJECT:
      return objectAssign({}, state, {durationBoxPlot: action.duration});

    case types.REMOVE_SPRING_DURATION_WET_OBJECT:
      return objectAssign({}, state, {durationWetBoxPlot: null});

    default:
      return state;
  }
}
