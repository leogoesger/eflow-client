import { fromJS } from 'immutable';
import MAP_STYLE from '../../constants/map-style.json';
import { classificationColor } from '../../constants/classification';

export const defaultMapStyle = fromJS(MAP_STYLE);

export const gaugeLayer = fromJS({
  id: 'gauges',
  source: 'gauges',
  type: 'circle',
  interactive: true,
  minzoom: 5,
  layout: {
    visibility: 'visible'
  },
  paint: {
    'circle-radius': {
      base: 3,
      stops: [[5, 3.5], [7, 4]]
    },
    'circle-stroke-color': 'rgb(100,100,100)',
    'circle-stroke-width': 1,
    'circle-color': {
      property: 'classId',
      stops: [
        [1, classificationColor[0][0]],
        [2, classificationColor[1][0]],
        [3, classificationColor[2][0]],
        [4, classificationColor[3][0]],
        [5, classificationColor[4][0]],
        [6, classificationColor[5][0]],
        [7, classificationColor[6][0]],
        [8, classificationColor[7][0]],
        [9, classificationColor[8][0]]
      ]
    }
  }
});

export const hoveredGaugeLayer = fromJS({
  id: 'hoveredGauge',
  source: 'hoveredGauge',
  type: 'circle',
  interactive: true,
  minzoom: 5,
  layout: {
    visibility: 'visible'
  },
  paint: {
    'circle-radius': {
      base: 7,
      stops: [[5, 4.5], [7, 5]]
    },
    'circle-stroke-color': 'rgb(100,100,100)',
    'circle-stroke-width': 2,
    'circle-color': {
      property: 'classId',
      stops: [
        [1, classificationColor[0][0]],
        [2, classificationColor[1][0]],
        [3, classificationColor[2][0]],
        [4, classificationColor[3][0]],
        [5, classificationColor[4][0]],
        [6, classificationColor[5][0]],
        [7, classificationColor[6][0]],
        [8, classificationColor[7][0]],
        [9, classificationColor[8][0]]
      ]
    }
  }
});
