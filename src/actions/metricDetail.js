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

export function fetchAllClassesBoxPlots() {
  return async dispatch => {
    const allMetricBoxPlots = await getAllMetricBoxPlotClourse();
    dispatch(fetchAllClassesBoxPlotObjects(allMetricBoxPlots));
    dispatch(updateLoadingObject(false));
  };
}

export function fetchAnnualFlowData(gaugeInfo) {
  return async dispatch => {
    const annualFlowData = await request
      .post(`${process.env.SERVER_ADDRESS}/api/annualflows`)
      .send(gaugeInfo);
    dispatch(fetchAnnualFlowDataObject(annualFlowData.body));
  };
}
