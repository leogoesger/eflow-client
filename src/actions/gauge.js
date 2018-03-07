import request from 'superagent';
import {GaugeTypes as types} from '../action-types';

const fetchGaugeObjects = gauges => {
  return {
    type: types.FETCH_GAUGE_OBJECTS,
    gauges,
  };
};

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
