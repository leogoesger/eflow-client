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
      console.log(process.env.SERVER_ADDRESS);
      const classifications = await request.get(
        `${process.env.SERVER_ADDRESS}/api/geoclasses`
      );
      dispatch(fetchClassificationObjects(classifications.body));
    } catch (e) {
      throw e;
    }
  };
}
