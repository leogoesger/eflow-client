import request from 'superagent';
import {GaugeTypes as types} from '../action-types';
import {removeCurrentClass} from './classification';
import {updateTab} from './hydrology';

const fetchGaugeObjects = gauges => {
  return {
    type: types.FETCH_GAUGE_OBJECTS,
    gauges,
  };
};

const fetchCurrentGaugeObject = gauge => {
  return {
    type: types.FETCH_CURRENT_GAUGE_OBJECT,
    gauge,
  };
};

export function removeCurrentGauge() {
  return dispatch => {
    dispatch(fetchCurrentGaugeObject(null));
  };
}

export function fetchGauges() {
  return async dispatch => {
    try {
      const gauges = await request.get(
        `${process.env.SERVER_ADDRESS}/api/gauges`
      );
      dispatch(fetchGaugeObjects(gauges.body));
    } catch (e) {
      throw e;
    }
  };
}

export function fetchCurrentGauge(gaugeId) {
  return async dispatch => {
    try {
      const gauge = await request.get(
        `${process.env.SERVER_ADDRESS}/api/gauges/${gaugeId}`
      );
      dispatch(fetchCurrentGaugeObject(gauge.body));
      dispatch(updateTab('b'));
      dispatch(removeCurrentClass());
    } catch (e) {
      throw e;
    }
  };
}
