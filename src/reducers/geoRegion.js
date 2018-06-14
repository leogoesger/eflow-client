import { GeoRegionTypes as types } from "../action-types";
import objectAssign from "object-assign";

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  geoRegions: null,
  currentRegion: "",
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_GEOREGION_OBJECTS:
      return objectAssign({}, state, { geoRegions: action.geoRegions });

    case types.UPDATE_CURRENT_REGION_OBJECT:
      return objectAssign({}, state, { currentRegion: action.currentRegion });
    default:
      return state;
  }
}
