import {fromJS} from 'immutable';
import MAP_STYLE from '../../constants/map-style-geo.json';

export const defaultMapStyle = fromJS(MAP_STYLE);

export const getSiteLayer = source => {
  return fromJS({
    id: source,
    source: source,
    type: 'symbol',
    interactive: true,
    layout: {
      'icon-image': {
        property: 'geoClassId',
        stops: [
          [1, `${source}-1`],
          [2, `${source}-2`],
          [3, `${source}-3`],
          [4, `${source}-4`],
          [5, `${source}-5`],
          [6, `${source}-6`],
        ],
      },
      'icon-allow-overlap': true,
      'text-field': {
        property: 'geoClassId',
        stops: [
          [1, `${source}-1`],
          [2, `${source}-2`],
          [3, `${source}-3`],
          [4, `${source}-4`],
          [5, `${source}-5`],
          [6, `${source}-6`],
        ],
      },
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      'text-size': 8,
      'text-transform': 'uppercase',
      'text-letter-spacing': 0.05,
      'text-offset': [0, 1.3],
    },
    paint: {
      'text-color': '#ffffff',
    },
  });
};
