import {SummerTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  timingBoxPlot: null,
  magnitude10BoxPlot: null,
  magnitude50BoxPlot: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_SUMMER_TIMING_BP_OBJECT:
      return objectAssign({}, state, {timingBoxPlot: action.timing});

    case types.REMOVE_SUMMER_TIMING_BP_OBJECT:
      return objectAssign({}, state, {timingBoxPlot: null});

    case types.FETCH_SUMMER_MAGNITUDE_10_BP_OBJECT:
      return objectAssign({}, state, {magnitude10BoxPlot: action.magnitude});

    case types.REMOVE_SUMMER_MAGNITUDE_10_BP_OBJECT:
      return objectAssign({}, state, {magnitude10BoxPlot: null});

    case types.FETCH_SUMMER_MAGNITUDE_50_BP_OBJECT:
      return objectAssign({}, state, {magnitude50BoxPlot: action.magnitude});

    case types.REMOVE_SUMMER_MAGNITUDE_50_BP_OBJECT:
      return objectAssign({}, state, {magnitude50BoxPlot: null});

    default:
      return state;
  }
}
