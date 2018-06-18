import { GeoSiteTypes as types } from "../action-types";
import objectAssign from "object-assign";

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  geoSites: null,
  geoSite: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_GEOSITE_OBJECTS:
      return objectAssign({}, state, { geoSites: action.geoSites });

    case types.UPDATE_GEOSITE_OBJECT:
      return objectAssign({}, state, { geoSite: action.geoSite });

    default:
      return state;
  }
}
