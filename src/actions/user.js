import request from 'superagent';
import {UserTypes as types} from '../action-types';

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
