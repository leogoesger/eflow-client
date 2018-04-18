import request from 'superagent';
import {SpringTypes as types} from '../action-types';

const fetchSpringTimingObject = timing => {
  return {
    type: types.FETCH_SPRING_TIMING_BP_OBJECT,
    timing,
  };
};

const removeSpringTimingObject = () => {
  return {
    type: types.REMOVE_SPRING_TIMING_BP_OBJECT,
  };
};

const fetchSpringMagnitudeObject = magnitude => {
  return {
    type: types.FETCH_SPRING_MAGNITUDE_BP_OBJECT,
    magnitude,
  };
};

const removeSpringMagnitudeObject = () => {
  return {
    type: types.REMOVE_SPRING_MAGNITUDE_BP_OBJECT,
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

      default:
        return null;
    }
  };
}
