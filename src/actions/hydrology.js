import {HydrologyTypes as types} from '../action-types';

const updateSelectedTab = tabValue => {
  return {
    type: types.UPDATE_SELECTED_TAB,
    tabValue,
  };
};

export function updateTab(tabValue) {
  return dispatch => {
    dispatch(updateSelectedTab(tabValue));
  };
}
