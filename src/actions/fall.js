import request from 'superagent';
import {FallTypes as types} from '../action-types';

const fetchFallTimingObject = timing => {
  return {
    type: types.FETCH_FALL_TIMING_OBJECT,
    timing,
  };
};

const removeFallTimingObject = () => {
  return {
    type: types.REMOVE_FALL_TIMING_OBJECT,
  };
};

const fetchFallMagnitudeObject = magnitude => {
  return {
    type: types.FETCH_FALL_MAGNITUDE_OBJECT,
    magnitude,
  };
};

const removeFallMagnitudeObject = () => {
  return {
    type: types.REMOVE_FALL_MAGNITUDE_OBJECT,
  };
};

const fetchFallTimingWetObject = timing => {
  return {
    type: types.FETCH_FALL_TIMING_WET_OBJECT,
    timing,
  };
};

const removeFallTimingWetObject = () => {
  return {
    type: types.REMOVE_FALL_TIMING_WET_OBJECT,
  };
};

const fetchFallDurationObject = duration => {
  return {
    type: types.FETCH_FALL_DURATION_OBJECT,
    duration,
  };
};

const removeFallDurationObject = () => {
  return {
    type: types.REMOVE_FALL_DURATION_OBJECT,
  };
};

export function fetchFallBoxPlotData(data) {
  return async dispatch => {
    const fallData = await request
      .post(`${process.env.SERVER_ADDRESS}/api/falls/getBoxPlotAttributes`)
      .send(data.fetchData);

    switch (data.type) {
      case 'fallTiming':
        return dispatch(fetchFallTimingObject(fallData.body));

      case 'fallMagnitude':
        return dispatch(fetchFallMagnitudeObject(fallData.body));

      case 'fallTimingWet':
        return dispatch(fetchFallTimingWetObject(fallData.body));

      case 'fallDuration':
        return dispatch(fetchFallDurationObject(fallData.body));

      default:
        return null;
    }
  };
}

export function removeFallBoxPlotData(data) {
  return dispatch => {
    switch (data.type) {
      case 'fallTiming':
        return dispatch(removeFallTimingObject());

      case 'fallMagnitude':
        return dispatch(removeFallMagnitudeObject());

      case 'fallTimingWet':
        return dispatch(removeFallTimingWetObject());

      case 'fallDuration':
        return dispatch(removeFallDurationObject());

      default:
        return null;
    }
  };
}
