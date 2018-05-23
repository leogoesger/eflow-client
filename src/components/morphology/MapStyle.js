import {fromJS} from 'immutable';
import MAP_STYLE from '../../constants/map-style-geo.json';

export const defaultMapStyle = fromJS(MAP_STYLE);

export const siteLayer = fromJS({
  id: 'sites',
  source: 'sites',
  type: 'circle',
  interactive: true,
  minzoom: 5,
  layout: {
    visibility: 'visible',
  },
  paint: {
    'circle-radius': {
      base: 3,
      stops: [[5, 3.5], [7, 4]],
    },
    'circle-stroke-color': '#fafafa',
    'circle-stroke-width': 1,
    'circle-color': {
      property: 'geoClassId',
      stops: [
        [1, '#e57373'], //red
        [2, '#ba68c8'], //purple
        [3, '#64b5f6'], //blue
        [4, '#81c784'], //green
        [5, '#ffb74d'], //deep orange
        [6, '#90a4ae'], //blue grey
      ],
    },
  },
});
