import {HydrologyTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  tabValue: 'a',
  hoveredGauge: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.UPDATE_SELECTED_TAB:
      return objectAssign({}, state, {tabValue: action.tabValue});

    case types.UPDATE_HOVERED_GAUGE:
      return objectAssign({}, state, {hoveredGauge: action.gauge});

    default:
      return state;
  }
}
