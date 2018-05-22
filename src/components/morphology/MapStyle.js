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
        [1, '#f9a825'], //yellow #f9a825
        [2, '#0D47A1'], //blue #1a237e
        [3, '#03a9f4'], //light blue
        [4, '#ff6f00'], //orange Winter storm
        [5, '#F44336'],
        [6, '#087f23'], //green
      ],
    },
  },
});
