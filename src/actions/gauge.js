import request from 'superagent';
import {GaugeTypes as types} from '../action-types';
import {removeCurrentClass} from './classification';

const fetchGaugeObjects = gauges => {
  return {
    type: types.FETCH_GAUGE_OBJECTS,
    gauges,
  };
};

const updateCurrentGaugeObject = gaugeId => {
  return {
    type: types.UPDATE_CURRENT_GAUGE_OBJECT,
    gaugeId,
  };
};

export function removeCurrentGauge() {
  return async dispatch => {
    try {
      dispatch(updateCurrentGaugeObject(null));
    } catch (e) {
      throw e;
    }
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

export function updateCurrentGauge(gaugeId) {
  return async dispatch => {
    try {
      dispatch(removeCurrentClass());
      dispatch(updateCurrentGaugeObject(gaugeId));
    } catch (e) {
      throw e;
    }
  };
}
