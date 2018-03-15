import {HydrologyTypes as types} from '../action-types';

const updateSelectedTab = tabValue => {
  return {
    type: types.UPDATE_SELECTED_TAB,
    tabValue,
  };
};

const updateHoveredGaugeId = gauge => {
  return {
    type: types.UPDATE_HOVERED_GAUGE,
    gauge,
  };
};

export function updateTab(tabValue) {
  return dispatch => {
    dispatch(updateSelectedTab(tabValue));
  };
}

export function updateHoveredGauge(gauge) {
  return dispatch => {
    dispatch(updateHoveredGaugeId(gauge));
  };
}
