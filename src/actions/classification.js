import request from 'superagent';
import {ClassificationTypes as types} from '../action-types';

const fetchClassificationObjects = classifications => {
  return {
    type: types.FETCH_CLASSIFICATION_OBJECTS,
    classifications,
  };
};

export function fetchClassifications() {
  return async dispatch => {
    try {
      const classifications = await request.get(
        'http://127.0.0.1:8080/api/geoclasses'
      );
      dispatch(fetchClassificationObjects(classifications.body));
    } catch (e) {
      throw e;
    }
  };
}
