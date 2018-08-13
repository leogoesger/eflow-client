import request from "superagent";
import { UserTypes as types } from "../action-types";
import { navigateTo } from "../utils/helpers";

const fetchBroadCastMessageObject = message => {
  return {
    type: types.FETCH_BROADCAST_MESSAGE,
    message,
  };
};

const submitBugReportObject = bugReport => {
  return {
    type: types.SUBMIT_BUG_REPORT_OBJECT,
    bugReport,
  };
};

const loginUserObject = user => {
  return {
    type: types.USER_LOGIN_OBJECT,
    user,
  };
};

const removeUserObject = () => {
  return {
    type: types.REMOVE_USER_OBJECT,
  };
};

export function fetchBroadCastMessage(message) {
  return dispatch => {
    dispatch(fetchBroadCastMessageObject(message));
  };
}

export function submitBugReport(bugReport) {
  return async dispatch => {
    try {
      const reportData = await request
        .post(`${process.env.SERVER_ADDRESS}/api/bugReport`)
        .send(bugReport);
      dispatch(submitBugReportObject(reportData.body.message));
    } catch (e) {
      throw e;
    }
  };
}

export function loginUser(user) {
  return async dispatch => {
    try {
      const response = await request
        .post(`${process.env.SERVER_ADDRESS}/api/user/login`)
        .send(user);
      localStorage.setItem("ff_jwt", response.body.ff_jwt);
      dispatch(loginUserObject(response.body));
      navigateTo("/admin");
    } catch (e) {
      throw e;
    }
  };
}

export function removeUser() {
  return dispatch => {
    dispatch(removeUserObject());
  };
}
