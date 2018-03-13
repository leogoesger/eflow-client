import {GaugeTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  gauges: null,
  currentGauge: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_GAUGE_OBJECTS:
      return objectAssign({}, state, {gauges: action.gauges});

    case types.UPDATE_CURRENT_GAUGE_OBJECT:
      return objectAssign({}, state, {currentGauge: action.gaugeId});

    default:
      return state;
  }
}
