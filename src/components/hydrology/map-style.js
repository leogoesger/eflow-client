import {fromJS} from 'immutable';
import MAP_STYLE from './map-style-basic.json';

export const dataLayer = fromJS({
  id: 'data',
  source: 'classData',
  type: 'line',
  interactive: true,
  minzoom: 5,
  paint: {
    'line-color': {
      property: 'CLASS',
      stops: [
        [0, '#3288bd'],
        [1, '#66c2a5'],
        [2, '#abdda4'],
        [3, '#e6f598'],
        [4, '#ffffbf'],
        [5, '#fee08b'],
        [6, '#fdae61'],
        [7, '#f46d43'],
        [8, '#d53e4f'],
        [9, '#d53e4f'],
      ],
    },
    'line-width': {
      base: 1,
      stops: [[0, 1], [5, 1], [10, 3], [18, 2]],
    },
  },
});

export const defaultMapStyle = fromJS(MAP_STYLE);
