import request from 'superagent';
import {FallWinterTypes as types} from '../action-types';

const fetchFallWinterMagnitudObject = magnitude => {
  return {
    type: types.FETCH_FALL_WINTER_MAGNITUDE_BP_OBJECT,
    magnitude,
  };
};

const removeFallWinterMagnitudObject = () => {
  return {
    type: types.REMOVE_FALL_WINTER_MAGNITUDE_BP_OBJECT,
  };
};

export function fetchFallWinterBoxPlotData(data) {
  return async dispatch => {
    const fallWinterData = await request
      .post(
        `${process.env.SERVER_ADDRESS}/api/fallWinters/getBoxPlotAttributes`
      )
      .send(data.fetchData);

    dispatch(fetchFallWinterMagnitudObject(fallWinterData.body));
  };
}

export function removeFallWinterBoxPlotData() {
  return dispatch => {
    dispatch(removeFallWinterMagnitudObject());
  };
}
