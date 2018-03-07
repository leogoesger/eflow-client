import {GaugeTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  gauges: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_GAUGE_OBJECTS:
      return objectAssign({}, state, {gauges: action.gauges});

    default:
      return state;
  }
}
