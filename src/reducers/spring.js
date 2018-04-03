import {SpringTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  springData: [],
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_SPRING_DATA_OBJECT:
      return objectAssign({}, state, {springData: action.springData});

    case types.REMOVE_SPRING_DATA_OBJECT:
      return objectAssign({}, state, {springData: action.springData});

    default:
      return state;
  }
}
