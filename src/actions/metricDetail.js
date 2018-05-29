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

const toggleMetricObjects = toggledMetrics => {
  return {
    type: types.TOGGLE_METRIC_OBJECT,
    toggledMetrics,
  };
};

const handleToggleLogScaleObject = status => {
  return {
    type: types.TOGGLE_LOG_SCALE_OBJECT,
    status,
  };
};

const handleHydrographOverlayObject = status => {
  return {
    type: types.TOGGLE_HYDROGRAPH_OVERLAY_OBJECT,
    status,
  };
};

const fetchHydrographOverlayObject = hydrograph => {
  return {
    type: types.FETCH_HYDROGRAPH_OVERLAY_OBJECT,
    hydrograph,
  };
};

const handleFixedYaxisObject = percentile => {
  return {
    type: types.TOGGLE_FIXED_YAXIS_OBJECT,
    percentile,
  };
};

const getFixedYaxisValueObject = yMax => {
  return {
    type: types.GET_FIXED_YAXIS_VALUE_OBJECT,
    yMax,
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

export function fetchHydrographOverlay(gaugeInfo) {
  return async dispatch => {
    const hydrograph = await request
      .post(`${process.env.SERVER_ADDRESS}/api/dimHydrographs/`)
      .send({gaugeId: gaugeInfo});
    dispatch(fetchHydrographOverlayObject(hydrograph.body));
  };
}

export function toggleMetricGaugeDrawer(status) {
  return async dispatch => {
    dispatch(toggleDrawerObject(status));
  };
}

export function toggleAnnualFlowMetrics(toggledMetrics) {
  return async dispatch => {
    dispatch(toggleMetricObjects(toggledMetrics));
  };
}

export function handleToggleLogScale(status) {
  return async dispatch => {
    dispatch(handleToggleLogScaleObject(status));
  };
}

export function handleHydrographOverlay(status) {
  return async dispatch => {
    dispatch(handleHydrographOverlayObject(status));
  };
}

export function handleFixedYaxis(percentile) {
  return async dispatch => {
    dispatch(handleFixedYaxisObject(Number(percentile)));
  };
}

export function getYaxisMax(gaugeId, percentile) {
  return async dispatch => {
    const yMax = await request
      .post(`${process.env.SERVER_ADDRESS}/api/annualFlowPOR`)
      .send({gaugeId, percentile});
    dispatch(getFixedYaxisValueObject(yMax.body.percentilePOR));
  };
}
