import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import classification from "./classification";
import gauge from "./gauge";
import hydrology from "./hydrology";
import member from "./member";
import paper from "./paper";
import fall from "./fall";
import spring from "./spring";
import summer from "./summer";
import winter from "./winter";
import fallWinter from "./fallWinter";
import knownIssue from "./knownIssue";
import releaseNote from "./releaseNote";
import metricDetail from "./metricDetail";
import user from "./user";
import geoSite from "./geoSite";
import geoRegion from "./geoRegion";
import appInfo from "./appInfo";

const rootReducer = combineReducers({
  routing: routerReducer,
  classification,
  hydrology,
  gauge,
  member,
  paper,
  fall,
  spring,
  summer,
  winter,
  fallWinter,
  knownIssue,
  releaseNote,
  metricDetail,
  user,
  geoSite,
  geoRegion,
  appInfo,
});

export default rootReducer;
