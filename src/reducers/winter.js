import {WinterTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  magnitude2BoxPlot: null,
  magnitude5BoxPlot: null,
  magnitude10BoxPlot: null,
  magnitude20BoxPlot: null,
  magnitude50BoxPlot: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_WINTER_MAGNITUDE_2_BP_OBJECT:
      return objectAssign({}, state, {magnitude2BoxPlot: action.magnitude});

    case types.REMOVE_WINTER_MAGNITUDE_2_BP_OBJECT:
      return objectAssign({}, state, {magnitude2BoxPlot: null});

    case types.FETCH_WINTER_MAGNITUDE_5_BP_OBJECT:
      return objectAssign({}, state, {magnitude5BoxPlot: action.magnitude});

    case types.REMOVE_WINTER_MAGNITUDE_5_BP_OBJECT:
      return objectAssign({}, state, {magnitude5BoxPlot: null});

    case types.FETCH_WINTER_MAGNITUDE_10_BP_OBJECT:
      return objectAssign({}, state, {magnitude10BoxPlot: action.magnitude});

    case types.REMOVE_WINTER_MAGNITUDE_10_BP_OBJECT:
      return objectAssign({}, state, {magnitude10BoxPlot: null});

    case types.FETCH_WINTER_MAGNITUDE_20_BP_OBJECT:
      return objectAssign({}, state, {magnitude20BoxPlot: action.magnitude});

    case types.REMOVE_WINTER_MAGNITUDE_20_BP_OBJECT:
      return objectAssign({}, state, {magnitude20BoxPlot: null});

    case types.FETCH_WINTER_MAGNITUDE_50_BP_OBJECT:
      return objectAssign({}, state, {magnitude50BoxPlot: action.magnitude});

    case types.REMOVE_WINTER_MAGNITUDE_50_BP_OBJECT:
      return objectAssign({}, state, {magnitude50BoxPlot: null});

    default:
      return state;
  }
}
