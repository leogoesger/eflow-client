import request from 'superagent';
import {GeoSiteTypes as types} from '../action-types';

const fetchGeoSitesObjects = geoSites => {
  return {
    type: types.FETCH_GEOSITE_OBJECTS,
    geoSites,
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
