import {HydrologyTypes as types} from '../action-types';

const updateSelectedTab = tabValue => {
  return {
    type: types.UPDATE_SELECTED_TAB,
    tabValue,
  };
};

const updateHoveredGaugeId = gaugeId => {
  return {
    type: types.UPDATE_HOVERED_GAUGE,
    gaugeId,
  };
};

export function updateTab(tabValue) {
  return dispatch => {
    dispatch(updateSelectedTab(tabValue));
  };
}

export function updateHoveredGauge(gaugeId) {
  return dispatch => {
    dispatch(updateHoveredGaugeId(gaugeId));
  };
}
