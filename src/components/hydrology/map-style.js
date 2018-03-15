import {fromJS} from 'immutable';
import MAP_STYLE from '../../constants/map-style.json';

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
      base: 3,
      stops: [[5, 3.5], [7, 4]],
    },
    'circle-stroke-color': '#fafafa',
    'circle-stroke-width': 1,
    'circle-color': {
      property: 'classId',
      stops: [
        [1, '#f9a825'], //yellow #f9a825
        [2, '#0D47A1'], //blue #1a237e
        [3, '#03a9f4'], //light blue
        [4, '#ff6f00'], //orange Winter storm
        [5, '#F44336'],
        [6, '#087f23'], //green
        [7, '#f06292'], //pink
        [8, '#7E57C2'],
        [9, '#C51162'],
      ],
    },
  },
});

export const hoveredGaugeLayer = fromJS({
  id: 'hoveredGauge',
  source: 'hoveredGauge',
  type: 'circle',
  interactive: true,
  minzoom: 5,
  layout: {
    visibility: 'visible',
  },
  paint: {
    'circle-radius': {
      base: 7,
      stops: [[5, 7.5], [7, 8]],
    },
    'circle-stroke-color': '#fafafa',
    'circle-stroke-width': 2,
    'circle-color': {
      property: 'classId',
      stops: [
        [1, '#f9a825'], //yellow #f9a825
        [2, '#0D47A1'], //blue #1a237e
        [3, '#03a9f4'], //light blue
        [4, '#ff6f00'], //orange Winter storm
        [5, '#F44336'],
        [6, '#087f23'], //green
        [7, '#f06292'], //pink
        [8, '#7E57C2'],
        [9, '#C51162'],
      ],
    },
  },
});
