import request from 'superagent';
import {ClassificationTypes as types} from '../action-types';

const fetchClassificationObject = classification => {
  return {
    type: types.UPDATE_CLASSIFICATION_OBJECT,
    classification,
  };
};

const updateCurrentClassObject = classId => {
  return {
    type: types.UPDATE_CURRENT_CLASS_OBJECT,
    classId,
  };
};

export function fetchClassification(classId) {
  return async dispatch => {
    try {
      const classification = await request.get(
        `${process.env.SERVER_ADDRESS}/api/classes/${classId}`
      );
      dispatch(fetchClassificationObject(classification.body));
    } catch (e) {
      throw e;
    }
  };
}

export function updateCurrentClass(classId) {
  return async dispatch => {
    try {
      dispatch(updateCurrentClassObject(classId));
    } catch (e) {
      throw e;
    }
  };
}
