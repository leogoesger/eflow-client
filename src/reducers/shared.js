import {SharedTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  showGeneralInfo: true,
  tabValue: 'a',
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.UPDATE_SELECTED_TAB:
      return objectAssign({}, state, {tabValue: action.tabValue});

    case types.TOGGLE_GENERAL_INFO:
      return objectAssign({}, state, {showGeneralInfo: action.condition});

    default:
      return state;
  }
}
