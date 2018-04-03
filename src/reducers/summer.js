import {SummerTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  summerData: [],
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_SUMMER_DATA_OBJECT:
      return objectAssign({}, state, {summerData: action.summerData});

    case types.REMOVE_SUMMER_DATA_OBJECT:
      return objectAssign({}, state, {summerData: action.summerData});

    default:
      return state;
  }
}
