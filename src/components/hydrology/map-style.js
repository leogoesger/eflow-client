import {fromJS} from 'immutable';
import MAP_STYLE from '../../constants/map-style-basic.json';

export const dataLayer = fromJS({
  id: 'data',
  source: 'classData',
  type: 'line',
  interactive: true,
  minzoom: 5,
  layout: {
    visibility: 'visible',
  },
  paint: {
    'line-color': {
      property: 'CLASS',
      stops: [
        [1, '#fbc02d'], //yellow
        [2, '#0D47A1'],
        [3, '#00bcd4'], //light blue
        [4, '#ff6f00'], //orange Winter storm
        [5, '#F44336'],
        [6, '#087f23'], //green
        [7, '#f06292'], //pink
        [8, '#7E57C2'],
        [9, '#C51162'],
      ],
    },
    'line-width': {
      base: 1,
      stops: [[0, 1], [5, 1], [10, 3], [18, 2]],
    },
  },
});

export const defaultMapStyle = fromJS(MAP_STYLE);

export const gaugeLayer = fromJS({
  id: 'gauges',
  source: 'gauges',
  type: 'circle',
  interactive: true,
  minzoom: 5,
  layout: {
    visibility: 'visible',
  },
  paint: {
    'circle-radius': {
      base: 3.5,
      stops: [[5, 2.2], [7, 4]],
    },
    'circle-stroke-color': '#0277bd',
    'circle-stroke-width': 1,
    'circle-color': '#fff',
  },
});
