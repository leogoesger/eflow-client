import {ClassificationTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  classifications: {
    class1: null,
    class2: null,
    class3: null,
    class4: null,
    class5: null,
    class6: null,
    class7: null,
    class8: null,
    class9: null,
  },
  currentClassification: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.UPDATE_CLASSIFICATION_OBJECT:
      return objectAssign({}, state, {
        classifications: {
          ...state.classifications,
          [`class${action.classification.id}`]: action.classification,
        },
      });

    case types.UPDATE_CURRENT_CLASS_OBJECT:
      return objectAssign({}, state, {currentClassification: action.classId});

    default:
      return state;
  }
}
