import { UserTypes as types } from "../action-types";
import objectAssign from "object-assign";

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  message: null,
  submitEmailMessage: "",
  currentUser: null,
  userErrorMessage: "",
  failedUploads: null,
  uploads: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_BROADCAST_MESSAGE:
      return objectAssign({}, state, { message: action.message });

    case types.SUBMIT_BUG_REPORT_OBJECT:
      return objectAssign({}, state, { submitEmailMessage: action.bugReport });

    case types.USER_LOGIN_OBJECT:
      return objectAssign({}, state, { currentUser: action.user });

    case types.REMOVE_USER_OBJECT:
      return objectAssign({}, state, { currentUser: null });

    case types.USER_ERROR_MESSAGE:
      return objectAssign({}, state, { userErrorMessage: action.msg });

    case types.ADMIN_FAILED_UPLOAD:
      return objectAssign({}, state, { failedUploads: action.uploads });

    case types.ADMIN_UPLOADS:
      return objectAssign({}, state, { uploads: action.uploads });

    default:
      return state;
  }
}
