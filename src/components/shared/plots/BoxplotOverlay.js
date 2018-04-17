import React from 'react';
import PropTypes from 'prop-types';
import {find, cloneDeep} from 'lodash';

const locateY = (data, x) => {
  const locatedY = find(data.FIFTY, o => {
    return o.date == Math.floor(Number(x));
  });
  return locatedY.flow;
};

const getOffset = data => {
  const offsetData = cloneDeep(data);
  offsetData.quartile = offsetData.quartile.map(
    d => (d > 274 ? d - 274 : d + 91)
  );
  offsetData.whiskers = offsetData.whiskers.map(
    d => (d > 274 ? d - 274 : d + 91)
  );
  if (offsetData.whiskers[1] < offsetData.whiskers[0]) {
    if (offsetData.whiskers[0] > offsetData.quartile[0]) {
      offsetData.whiskers[0] = 2;
    } else {
      offsetData.whiskers[1] = 365;
    }
  }
  return offsetData;
};

const getColor = metricName => {
  switch (metricName) {
    case 'fallTiming':
      return ['#f9a825', '#fdd835'];
    case 'fallTimingWet':
      return ['#558b2f', '#4caf50'];

    case 'springTiming':
      return ['#6a1b9a', '#8e24aa'];

    case 'summerTiming':
      return ['#bf360c', '#f4511e'];

    default:
      return null;
  }
};

const BoxplotOverlay = props => {
  if (!props) {
    return null;
  }
  const dataWithOffset = getOffset(props.boxplotData);
  return (
    <g>
      <line
        strokeWidth={2}
        stroke={getColor(props.boxplotData.metricName)[0]}
        x1={props.xScale(dataWithOffset.whiskers[0])}
        x2={props.xScale(dataWithOffset.quartile[0])}
        y1={props.yScale(locateY(props.data, dataWithOffset.quartile[1]))}
        y2={props.yScale(locateY(props.data, dataWithOffset.quartile[1]))}
        transform={props.transform}
      />
      <line
        strokeWidth={2}
        stroke={getColor(props.boxplotData.metricName)[0]}
        x1={props.xScale(dataWithOffset.quartile[2])}
        x2={props.xScale(dataWithOffset.whiskers[1])}
        y1={props.yScale(locateY(props.data, dataWithOffset.quartile[1]))}
        y2={props.yScale(locateY(props.data, dataWithOffset.quartile[1]))}
        transform={props.transform}
      />
      <rect
        width={
          props.xScale(dataWithOffset.quartile[2]) -
          props.xScale(dataWithOffset.quartile[0])
        }
        height={16}
        x={props.xScale(dataWithOffset.quartile[0])}
        y={props.yScale(locateY(props.data, dataWithOffset.quartile[1])) - 8}
        fill={getColor(props.boxplotData.metricName)[1]}
        stroke={getColor(props.boxplotData.metricName)[0]}
        fillOpacity={'0.8'}
        transform={props.transform}
      />

      <line
        strokeWidth={2}
        stroke={getColor(props.boxplotData.metricName)[0]}
        x1={props.xScale(dataWithOffset.whiskers[0])}
        x2={props.xScale(dataWithOffset.whiskers[0])}
        y1={props.yScale(locateY(props.data, dataWithOffset.quartile[1])) - 8}
        y2={props.yScale(locateY(props.data, dataWithOffset.quartile[1])) + 8}
        transform={props.transform}
      />
      <line
        strokeWidth={2}
        stroke={getColor(props.boxplotData.metricName)[0]}
        x1={props.xScale(dataWithOffset.whiskers[1])}
        x2={props.xScale(dataWithOffset.whiskers[1])}
        y1={props.yScale(locateY(props.data, dataWithOffset.quartile[1])) - 8}
        y2={props.yScale(locateY(props.data, dataWithOffset.quartile[1])) + 8}
        transform={props.transform}
      />
      <line
        strokeWidth={2}
        stroke={getColor(props.boxplotData.metricName)[0]}
        x1={props.xScale(dataWithOffset.quartile[1])}
        x2={props.xScale(dataWithOffset.quartile[1])}
        y1={props.yScale(locateY(props.data, dataWithOffset.quartile[1])) - 8}
        y2={props.yScale(locateY(props.data, dataWithOffset.quartile[1])) + 8}
        transform={props.transform}
      />
    </g>
  );
};

BoxplotOverlay.propTypes = {
  boxplotData: PropTypes.object,
  data: PropTypes.object,
  transform: PropTypes.string,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  height: PropTypes.number,
};

export default BoxplotOverlay;
