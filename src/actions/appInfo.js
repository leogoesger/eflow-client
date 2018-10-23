import request from "superagent";
import { AppInfoTypes as types } from "../action-types";
// import gitlog from "gitlog";

const fetchAppInfoObject = appInfo => {
  return {
    type: types.FETCH_APP_INFO,
    appInfo,
  };
};

export function fetchAppInfo() {
  return async dispatch => {
    try {
      const appEnv = await request
        .get(`${process.env.SERVER_ADDRESS}/api/admin/env`)
        .set({ ff_jwt: localStorage.getItem("ff_jwt") });

      const appInfo = appEnv.body;
      dispatch(fetchAppInfoObject(appInfo));
    } catch (e) {
      throw e;
    }
  };
}
