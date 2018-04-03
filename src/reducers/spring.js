import {SpringTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  timingBoxPlot: null,
  magnitudeBoxPlot: null,
  rateOfChangeBoxPlot: null,
  durationBoxPlot: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_SPRING_TIMING_OBJECT:
      return objectAssign({}, state, {timingBoxPlot: action.timing});

    case types.REMOVE_SPRING_TIMING_OBJECT:
      return objectAssign({}, state, {timingBoxPlot: null});

    case types.FETCH_SPRING_MAGNITUDE_OBJECT:
      return objectAssign({}, state, {magnitudeBoxPlot: action.magnitude});

    case types.REMOVE_SPRING_MAGNITUDE_OBJECT:
      return objectAssign({}, state, {magnitudeBoxPlot: null});

    case types.FETCH_SPRING_RATE_OF_CHANGE_OBJECT:
      return objectAssign({}, state, {
        rateOfChangeBoxPlot: action.rateOfChange,
      });

    case types.REMOVE_SPRING_RATE_OF_CHANGE_OBJECT:
      return objectAssign({}, state, {rateOfChangeBoxPlot: null});

    case types.FETCH_SPRING_DURATION_OBJECT:
      return objectAssign({}, state, {durationBoxPlot: action.duration});

    case types.REMOVE_SPRING_DURATION_OBJECT:
      return objectAssign({}, state, {durationBoxPlot: null});

    default:
      return state;
  }
}
