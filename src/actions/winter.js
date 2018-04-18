import request from 'superagent';
import {WinterTypes as types} from '../action-types';

const fetchWinterMagnitude2Object = magnitude => {
  return {
    type: types.FETCH_WINTER_MAGNITUDE_2_BP_OBJECT,
    magnitude,
  };
};

const fetchWinterMagnitude5Object = magnitude => {
  return {
    type: types.FETCH_WINTER_MAGNITUDE_5_BP_OBJECT,
    magnitude,
  };
};

const fetchWinterMagnitude10Object = magnitude => {
  return {
    type: types.FETCH_WINTER_MAGNITUDE_10_BP_OBJECT,
    magnitude,
  };
};

const fetchWinterMagnitude20Object = magnitude => {
  return {
    type: types.FETCH_WINTER_MAGNITUDE_20_BP_OBJECT,
    magnitude,
  };
};

const fetchWinterMagnitude50Object = magnitude => {
  return {
    type: types.FETCH_WINTER_MAGNITUDE_50_BP_OBJECT,
    magnitude,
  };
};

const removeWinterMagnitude2Object = () => {
  return {
    type: types.REMOVE_WINTER_MAGNITUDE_2_BP_OBJECT,
  };
};

const removeWinterMagnitude5Object = () => {
  return {
    type: types.REMOVE_WINTER_MAGNITUDE_5_BP_OBJECT,
  };
};

const removeWinterMagnitude10Object = () => {
  return {
    type: types.REMOVE_WINTER_MAGNITUDE_10_BP_OBJECT,
  };
};

const removeWinterMagnitude20Object = () => {
  return {
    type: types.REMOVE_WINTER_MAGNITUDE_20_BP_OBJECT,
  };
};

const removeWinterMagnitude50Object = () => {
  return {
    type: types.REMOVE_WINTER_MAGNITUDE_50_BP_OBJECT,
  };
};

export function fetchWinterBoxPlotData(data) {
  return async dispatch => {
    const winterData = await request
      .post(`${process.env.SERVER_ADDRESS}/api/winters/getBoxPlotAttributes`)
      .send(data.fetchData);

    switch (data.type) {
      case 'winterMagnitude2':
        return dispatch(fetchWinterMagnitude2Object(winterData.body));
      case 'winterMagnitude5':
        return dispatch(fetchWinterMagnitude5Object(winterData.body));
      case 'winterMagnitude10':
        return dispatch(fetchWinterMagnitude10Object(winterData.body));
      case 'winterMagnitude20':
        return dispatch(fetchWinterMagnitude20Object(winterData.body));
      case 'winterMagnitude50':
        return dispatch(fetchWinterMagnitude50Object(winterData.body));

      default:
        return null;
    }
  };
}

export function removeWinterBoxPlotData(data) {
  return dispatch => {
    switch (data.type) {
      case 'winterMagnitude2':
        return dispatch(removeWinterMagnitude2Object());
      case 'winterMagnitude5':
        return dispatch(removeWinterMagnitude5Object());
      case 'winterMagnitude10':
        return dispatch(removeWinterMagnitude10Object());
      case 'winterMagnitude20':
        return dispatch(removeWinterMagnitude20Object());
      case 'winterMagnitude50':
        return dispatch(removeWinterMagnitude50Object());

      default:
        return null;
    }
  };
}
