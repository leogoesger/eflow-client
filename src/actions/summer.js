import request from 'superagent';
import {SummerTypes as types} from '../action-types';

const fetchSummerTimingObject = timing => {
  return {
    type: types.FETCH_SUMMER_TIMING_OBJECT,
    timing,
  };
};

const removeSummerTimingObject = () => {
  return {
    type: types.REMOVE_SUMMER_TIMING_OBJECT,
  };
};

const fetchSummerMagnitude10Object = magnitude => {
  return {
    type: types.FETCH_SUMMER_MAGNITUDE_10_OBJECT,
    magnitude,
  };
};

const removeSummerMagnitude10Object = () => {
  return {
    type: types.REMOVE_SUMMER_MAGNITUDE_10_OBJECT,
  };
};

const fetchSummerMagnitude50Object = magnitude => {
  return {
    type: types.FETCH_SUMMER_MAGNITUDE_50_OBJECT,
    magnitude,
  };
};

const removeSummerMagnitude50Object = () => {
  return {
    type: types.REMOVE_SUMMER_MAGNITUDE_50_OBJECT,
  };
};

const fetchSummerDurationFlushObject = duration => {
  return {
    type: types.FETCH_SUMMER_DURATION_FLUSH_OBJECT,
    duration,
  };
};

const removeSummerDurationFlushObject = () => {
  return {
    type: types.REMOVE_SUMMER_DURATION_FLUSH_OBJECT,
  };
};

const fetchSummerDurationWetObject = duration => {
  return {
    type: types.FETCH_SUMMER_DURATION_WET_OBJECT,
    duration,
  };
};

const removeSummerDurationWetObject = () => {
  return {
    type: types.REMOVE_SUMMER_DURATION_WET_OBJECT,
  };
};

const fetchSummerNoFlowCountsObject = noFlowCounts => {
  return {
    type: types.FETCH_SUMMER_NO_FLOW_COUNTS_OBJECT,
    noFlowCounts,
  };
};

const removeSummerNoFlowCountsObject = () => {
  return {
    type: types.FETCH_SUMMER_NO_FLOW_COUNTS_OBJECT,
  };
};

export function fetchSummerBoxPlotData(data) {
  return async dispatch => {
    const summerData = await request
      .post(`${process.env.SERVER_ADDRESS}/api/summers/getBoxPlotAttributes`)
      .send(data.fetchData);

    switch (data.type) {
      case 'summerTiming':
        return dispatch(fetchSummerTimingObject(summerData.body));
      case 'summerMagnitude10':
        return dispatch(fetchSummerMagnitude10Object(summerData.body));
      case 'summerMagnitude50':
        return dispatch(fetchSummerMagnitude50Object(summerData.body));
      case 'summerDurationFlush':
        return dispatch(fetchSummerDurationFlushObject(summerData.body));
      case 'summerDurationWet':
        return dispatch(fetchSummerDurationWetObject(summerData.body));
      case 'summerNoFlowCounts':
        return dispatch(fetchSummerNoFlowCountsObject(summerData.body));

      default:
        return null;
    }
  };
}

export function removeSummerBoxPlotData(data) {
  return dispatch => {
    switch (data.type) {
      case 'summerTiming':
        return dispatch(removeSummerTimingObject());
      case 'summerMagnitude10':
        return dispatch(removeSummerMagnitude10Object());
      case 'summerMagnitude50':
        return dispatch(removeSummerMagnitude50Object());
      case 'summerDurationFlush':
        return dispatch(removeSummerDurationFlushObject());
      case 'summerDurationWet':
        return dispatch(removeSummerDurationWetObject());
      case 'summerNoFlowCounts':
        return dispatch(removeSummerNoFlowCountsObject());

      default:
        return null;
    }
  };
}
