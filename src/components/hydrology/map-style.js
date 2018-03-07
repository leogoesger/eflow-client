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
  type: 'circle',
  source: 'gauges',
  'source-layer': 'sf2010',
  paint: {
    // make circles larger as the user zooms from z12 to z22
    'circle-radius': {
      base: 1.75,
      stops: [[12, 2], [22, 180]],
    },
    // color circles by ethnicity, using a match expression
    // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
    'circle-color': '#3bb2d0',
  },
});
