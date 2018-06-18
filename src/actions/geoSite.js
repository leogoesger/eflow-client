import request from "superagent";
import { GeoSiteTypes as types } from "../action-types";

const fetchGeoSitesObjects = geoSites => {
  return {
    type: types.FETCH_GEOSITE_OBJECTS,
    geoSites,
  };
};

const updateCurrentSiteObject = geoSite => {
  return {
    type: types.UPDATE_GEOSITE_OBJECT,
    geoSite,
  };
};

export function fetchGeoSites() {
  return async dispatch => {
    try {
      const geoSites = await request.get(
        `${process.env.SERVER_ADDRESS}/api/geoSites`
      );
      dispatch(fetchGeoSitesObjects(geoSites.body));
    } catch (e) {
      throw e;
    }
  };
}

export function updateCurrentSite(geoSite) {
  return dispatch => {
    dispatch(updateCurrentSiteObject(geoSite));
  };
}
