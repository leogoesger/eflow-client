import request from 'superagent';
import {SummerTypes as types} from '../action-types';

const fetchSummerTimingObject = timing => {
  return {
    type: types.FETCH_SUMMER_TIMING_BP_OBJECT,
    timing,
  };
};

const removeSummerTimingObject = () => {
  return {
    type: types.REMOVE_SUMMER_TIMING_BP_OBJECT,
  };
};

const fetchSummerMagnitude10Object = magnitude => {
  return {
    type: types.FETCH_SUMMER_MAGNITUDE_10_BP_OBJECT,
    magnitude,
  };
};

const removeSummerMagnitude10Object = () => {
  return {
    type: types.REMOVE_SUMMER_MAGNITUDE_10_BP_OBJECT,
  };
};

const fetchSummerMagnitude50Object = magnitude => {
  return {
    type: types.FETCH_SUMMER_MAGNITUDE_50_BP_OBJECT,
    magnitude,
  };
};

const removeSummerMagnitude50Object = () => {
  return {
    type: types.REMOVE_SUMMER_MAGNITUDE_50_BP_OBJECT,
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

      default:
        return null;
    }
  };
}
