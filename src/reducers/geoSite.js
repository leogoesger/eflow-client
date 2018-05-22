import {GeoSiteTypes as types} from '../action-types';
import objectAssign from 'object-assign';

type STATE = {};
type ACTION = {};
const initialState: STATE = {
  geoSites: null,
};

export default function(state: STATE = initialState, action: ACTION) {
  switch (action.type) {
    case types.FETCH_GEOSITE_OBJECTS:
      return objectAssign({}, state, {geoSites: action.geoSites});

    default:
      return state;
  }
}
