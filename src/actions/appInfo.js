import request from "superagent";
import { AppInfoTypes as types } from "../action-types";
// import gitlog from "gitlog";

const fetchAppInfoObject = appInfo => {
  return {
    type: types.FETCH_APP_INFO,
    appInfo,
  };
};

// const clientAppInfo = () => {
//   //get git log and version # from package.json
//   const version = process.env.npm_package_version;
//   const clientEnv = gitlog({
//     repo: "./",
//     branch: "master",
//     number: 5,
//     fields: ["subject", "authorName", "authorDateRel"],
//   });
//   clientEnv.version = version;
//   return clientEnv;
// };

export function fetchAppInfo() {
  return async dispatch => {
    try {
      const apiEnv = await request
        .get(`${process.env.SERVER_ADDRESS}/api/admin/env`)
        .set({ ff_jwt: localStorage.getItem("ff_jwt") });

      // const clientEnv = clientAppInfo();

      const appInfo = {};

      appInfo.apiEnv = apiEnv.body;
      // appInfo.clientEnv = clientEnv;

      dispatch(fetchAppInfoObject(appInfo));
    } catch (e) {
      throw e;
    }
  };
}
