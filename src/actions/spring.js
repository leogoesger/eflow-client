import request from 'superagent';
import {SpringTypes as types} from '../action-types';

const fetchSpringTimingObject = timing => {
  return {
    type: types.FETCH_SPRING_TIMING_OBJECT,
    timing,
  };
};

const removeSpringTimingObject = () => {
  return {
    type: types.REMOVE_SPRING_TIMING_OBJECT,
  };
};

const fetchSpringMagnitudeObject = magnitude => {
  return {
    type: types.FETCH_SPRING_MAGNITUDE_OBJECT,
    magnitude,
  };
};

const removeSpringMagnitudeObject = () => {
  return {
    type: types.REMOVE_SPRING_MAGNITUDE_OBJECT,
  };
};

const fetchSpringRateOfChangeObject = rateOfChange => {
  return {
    type: types.FETCH_SPRING_TIMING_WET_OBJECT,
    rateOfChange,
  };
};

const removeSpringRateOfChangeObject = () => {
  return {
    type: types.REMOVE_SPRING_TIMING_WET_OBJECT,
  };
};

const fetchSpringDurationObject = duration => {
  return {
    type: types.FETCH_SPRING_DURATION_OBJECT,
    duration,
  };
};

const removeSpringDurationObject = () => {
  return {
    type: types.REMOVE_SPRING_DURATION_OBJECT,
  };
};

export function fetchSpringBoxPlotData(data) {
  return async dispatch => {
    const springData = await request
      .post(`${process.env.SERVER_ADDRESS}/api/springs/getBoxPlotAttributes`)
      .send(data.fetchData);

    switch (data.type) {
      case 'springTiming':
        return dispatch(fetchSpringTimingObject(springData.body));

      case 'springMagnitude':
        return dispatch(fetchSpringMagnitudeObject(springData.body));

      case 'springRateOfChange':
        return dispatch(fetchSpringRateOfChangeObject(springData.body));

      case 'springDuration':
        return dispatch(fetchSpringDurationObject(springData.body));

      default:
        return null;
    }
  };
}

export function removeSpringBoxPlotData(data) {
  return dispatch => {
    switch (data.type) {
      case 'springTiming':
        return dispatch(removeSpringTimingObject());

      case 'springMagnitude':
        return dispatch(removeSpringMagnitudeObject());

      case 'springRateOfChange':
        return dispatch(removeSpringRateOfChangeObject());

      case 'springDuration':
        return dispatch(removeSpringDurationObject());

      default:
        return null;
    }
  };
}
