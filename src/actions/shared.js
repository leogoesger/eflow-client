import {SharedTypes as types} from '../action-types';

const updateSelectedTab = tabValue => {
  return {
    type: types.UPDATE_SELECTED_TAB,
    tabValue,
  };
};

const toggleGeneralInfo = condition => {
  return {
    type: types.TOGGLE_GENERAL_INFO,
    condition,
  };
};

export function updateTab(tabValue) {
  return dispatch => {
    dispatch(updateSelectedTab(tabValue));
  };
}

export function toggleGeneral(condition) {
  return dispatch => {
    dispatch(toggleGeneralInfo(condition));
  };
}
