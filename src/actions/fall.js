import request from 'superagent';
import {FallTypes as types} from '../action-types';
import {cloneDeep} from 'lodash';

const fetchFallDataObject = fallData => {
  return {
    type: types.FETCH_FALL_DATA_OBJECT,
    fallData,
  };
};

const removeFallDataObject = fallData => {
  return {
    type: types.REMOVE_FALL_DATA_OBJECT,
    fallData,
  };
};

export function fetchFallData(data) {
  return async dispatch => {
    const fallData = await request
      .post(`${process.env.SERVER_ADDRESS}/api/falls/getBoxPlotAttributes`)
      .send(data.fetchData);

    const newData = cloneDeep(data.fallData);
    newData.push({...fallData.body, id: data.id});

    dispatch(fetchFallDataObject(newData));
  };
}

export function removeFallData(data) {
  return async dispatch => {
    const newData = data.fallData.filter(d => d.id != data.id);
    dispatch(removeFallDataObject(newData));
  };
}
