import {SharedTypes as types} from '../action-types';

const updateSelectedTab = value => {
  return {
    type: types.UPDATE_SELECTED_TAB,
    value,
  };
};

export function removeCurrentGauge(value) {
  return dispatch => {
    dispatch(updateSelectedTab(value));
  };
}
