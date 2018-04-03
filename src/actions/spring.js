import request from 'superagent';
import {SpringTypes as types} from '../action-types';
import {cloneDeep} from 'lodash';

const fetchSpringDataObject = springData => {
  return {
    type: types.FETCH_SPRING_DATA_OBJECT,
    springData,
  };
};

const removeSpringDataObject = springData => {
  return {
    type: types.REMOVE_SPRING_DATA_OBJECT,
    springData,
  };
};

export function fetchSpringData(data) {
  return async dispatch => {
    const springData = await request
      .post(`${process.env.SERVER_ADDRESS}/api/springs/getBoxPlotAttributes`)
      .send(data.fetchData);

    const newData = cloneDeep(data.springData);
    newData.push({...springData.body, id: data.id});

    dispatch(fetchSpringDataObject(newData));
  };
}

export function removeSpringData(data) {
  return async dispatch => {
    const newData = data.springData.filter(d => d.id != data.id);
    dispatch(removeSpringDataObject(newData));
  };
}
