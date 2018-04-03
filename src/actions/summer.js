import request from 'superagent';
import {SummerTypes as types} from '../action-types';
import {cloneDeep} from 'lodash';

const fetchSummerDataObject = summerData => {
  return {
    type: types.FETCH_SUMMER_DATA_OBJECT,
    summerData,
  };
};

const removeSummerDataObject = summerData => {
  return {
    type: types.REMOVE_SUMMER_DATA_OBJECT,
    summerData,
  };
};

export function fetchSummerData(data) {
  return async dispatch => {
    const summerData = await request
      .post(`${process.env.SERVER_ADDRESS}/api/summers/getBoxPlotAttributes`)
      .send(data.fetchData);

    const newData = cloneDeep(data.summerData);
    newData.push({...summerData.body, id: data.id});

    dispatch(fetchSummerDataObject(newData));
  };
}

export function removeSummerData(data) {
  return async dispatch => {
    const newData = data.summerData.filter(d => d.id != data.id);
    dispatch(removeSummerDataObject(newData));
  };
}
