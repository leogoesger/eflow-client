import request from 'superagent';
import {MetricDetailTypes as types} from '../action-types';
import {getAllMetricBoxPlotClourse} from './helpers';

const fetchAllClassesBoxPlotObjects = boxPlotData => {
  return {
    type: types.FETCH_ALL_CLASS_BOX_PLOT_OBJECTS,
    boxPlotData,
  };
};

const updateLoadingObject = loading => {
  return {
    type: types.UPDATE_LOADING_OBJECT,
    loading,
  };
};

const fetchAnnualFlowDataObject = annualFlowData => {
  return {
    type: types.FETCH_ANNUAL_FLOW_OBJECT,
    annualFlowData,
  };
};

const toggleDrawerObject = status => {
  return {
    type: types.TOGGLE_DRAWER_OBJECT,
    status,
  };
};

export function fetchAllClassesBoxPlots() {
  return async dispatch => {
    const allMetricBoxPlots = await getAllMetricBoxPlotClourse();
    dispatch(fetchAllClassesBoxPlotObjects(allMetricBoxPlots));
    dispatch(updateLoadingObject(false));
  };
}

export function fetchAnnualFlowData(gaugeInfo) {
  return async dispatch => {
    if (!gaugeInfo) {
      return dispatch(fetchAnnualFlowDataObject(null));
    }
    const annualFlowData = await request
      .post(`${process.env.SERVER_ADDRESS}/api/annualflows`)
      .send(gaugeInfo);
    dispatch(fetchAnnualFlowDataObject(annualFlowData.body));
  };
}

export function toggleMetricGaugeDrawer(status) {
  return async dispatch => {
    dispatch(toggleDrawerObject(status));
  };
}
