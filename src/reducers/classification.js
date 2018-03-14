import {ClassificationTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  currentClassification: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_CLASSIFICATION_OBJECT:
      return objectAssign({}, state, {
        currentClassification: action.classification,
      });

    default:
      return state;
  }
}
