import request from "superagent";
import { GaugeTypes as types } from "../action-types";
import { removeCurrentClass } from "./classification";
import { updateTab } from "./hydrology";

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

const searchGaugeObject = gauges => {
  return {
    type: types.SEARCH_GAUGE_OBJECT,
    gauges,
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
      dispatch(removeCurrentClass());
      const gauge = await request.get(
        `${process.env.SERVER_ADDRESS}/api/gauges/${gaugeId}`
      );
      dispatch(fetchCurrentGaugeObject(gauge.body));
      dispatch(updateTab("b"));
    } catch (e) {
      throw e;
    }
  };
}

export function searchGauge(keyWord) {
  return async dispatch => {
    try {
      if (!keyWord) {
        return dispatch(searchGaugeObject([]));
      }
      const gauges = await request
        .post(`${process.env.SERVER_ADDRESS}/api/gauges/search`)
        .send({ keyWord });
      dispatch(searchGaugeObject(gauges.body));
    } catch (e) {
      throw e;
    }
  };
}
