import request from 'superagent';
import {ClassificationTypes as types} from '../action-types';
import {removeCurrentGauge} from './gauge';
import {updateTab} from './hydrology';

const fetchClassificationObject = classification => {
  return {
    type: types.FETCH_CLASSIFICATION_OBJECT,
    classification,
  };
};

const fetchClassificationObjects = classifications => {
  return {
    type: types.FETCH_CLASSIFICATION_OBJECTS,
    classifications,
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
      dispatch(updateTab('b'));
      dispatch(removeCurrentGauge());
    } catch (e) {
      throw e;
    }
  };
}

export function fetchClassifications() {
  return async dispatch => {
    try {
      const classifications = await request.get(
        `${process.env.SERVER_ADDRESS}/api/classes`
      );
      dispatch(fetchClassificationObjects(classifications.body));
    } catch (e) {
      throw e;
    }
  };
}
