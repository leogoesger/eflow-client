import { AppInfoTypes as types } from "../action-types";
import objectAssign from "object-assign";

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  appInfo: null,
  error: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_APP_INFO:
      return objectAssign({}, state, { appInfo: action.appInfo });

    default:
      return state;
  }
}
