import request from 'superagent';
import {GeoRegionTypes as types} from '../action-types';

const fetchGeoRegionsObjects = geoRegions => {
  return {
    type: types.FETCH_GEOREGION_OBJECTS,
    geoRegions,
  };
};

export function fetchGeoRegions() {
  return async dispatch => {
    try {
      const geoRegions = await request.get(
        `${process.env.SERVER_ADDRESS}/api/geoRegions`
      );
      dispatch(fetchGeoRegionsObjects(geoRegions.body));
    } catch (e) {
      throw e;
    }
  };
}
