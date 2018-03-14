import request from 'superagent';
import {ClassificationTypes as types} from '../action-types';
import {removeCurrentGauge} from './gauge';

const fetchClassificationObject = classification => {
  return {
    type: types.FETCH_CLASSIFICATION_OBJECT,
    classification,
  };
};

export function removeCurrentClass() {
  return async dispatch => {
    try {
      dispatch(fetchClassificationObject(null));
    } catch (e) {
      throw e;
    }
  };
}

export function fetchClassification(classId) {
  return async dispatch => {
    try {
      const classification = await request.get(
        `${process.env.SERVER_ADDRESS}/api/classes/${classId}`
      );
      dispatch(fetchClassificationObject(classification.body));
      dispatch(removeCurrentGauge());
    } catch (e) {
      throw e;
    }
  };
}
