import request from "superagent";
import { AppInfoTypes as types } from "../action-types";

const fetchAppInfoObject = appInfo => {
  return {
    type: types.FETCH_APP_INFO,
    appInfo,
  };
};

export function fetchAppInfo() {
  return async dispatch => {
    try {
      const appInfo = await request
        .get(`${process.env.SERVER_ADDRESS}/api/admin/env`)
        .set({ ff_jwt: localStorage.getItem("ff_jwt") });
      dispatch(fetchAppInfoObject(appInfo.body));
    } catch (e) {
      throw e;
    }
  };
}
