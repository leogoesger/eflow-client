import {MetricDetailTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  annualFlowData: null,
  boxPlotData: null,
  loading: true,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_ALL_CLASS_BOX_PLOT_OBJECTS:
      return objectAssign({}, state, {boxPlotData: action.boxPlotData});

    case types.FETCH_ANNUAL_FLOW_OBJECT:
      return objectAssign({}, state, {annualFlowData: action.annualFlowData});

    case types.UPDATE_LOADING_OBJECT:
      return objectAssign({}, state, {loading: action.loading});

    default:
      return state;
  }
}
