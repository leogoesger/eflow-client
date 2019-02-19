import { MetricDetailTypes as types } from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  annualFlowData: null,
  isDrawerOpen: false,
  toggledMetrics: [],
  boxPlotData: null,
  loading: true,
  logScale: false,
  isHydrographOverlay: false,
  fixedYaxis: null,
  hydrograph: null,
  yMax: null,
  bPYAxisRange: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_ALL_CLASS_BOX_PLOT_OBJECTS:
      return objectAssign({}, state, { boxPlotData: action.boxPlotData });

    case types.FETCH_ANNUAL_FLOW_OBJECT:
      return objectAssign({}, state, { annualFlowData: action.annualFlowData });

    case types.TOGGLE_DRAWER_OBJECT:
      return objectAssign({}, state, { isDrawerOpen: action.status });

    case types.UPDATE_LOADING_OBJECT:
      return objectAssign({}, state, { loading: action.loading });

    case types.TOGGLE_METRIC_OBJECT:
      return objectAssign({}, state, { toggledMetrics: action.toggledMetrics });

    case types.TOGGLE_LOG_SCALE_OBJECT:
      return objectAssign({}, state, { logScale: action.status });

    case types.TOGGLE_HYDROGRAPH_OVERLAY_OBJECT:
      return objectAssign({}, state, { isHydrographOverlay: action.status });

    case types.FETCH_HYDROGRAPH_OVERLAY_OBJECT:
      return objectAssign({}, state, { hydrograph: action.hydrograph });

    case types.TOGGLE_FIXED_YAXIS_OBJECT:
      return objectAssign({}, state, { fixedYaxis: action.percentile });

    case types.GET_FIXED_YAXIS_VALUE_OBJECT:
      return objectAssign({}, state, { yMax: action.yMax });

    case types.GET_BOX_PLOT_FIXED_YAXIS_VALUE_OBJECT:
      return objectAssign({}, state, { bPYAxisRange: action.bPYAxisRange });

    default:
      return state;
  }
}
