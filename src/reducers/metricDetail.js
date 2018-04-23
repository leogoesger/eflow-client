import {MetricDetailTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  boxPlotData: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_ALL_CLASS_BOX_PLOT_OBJECTS:
      return objectAssign({}, state, {boxPlotData: action.boxPlotData});

    default:
      return state;
  }
}
