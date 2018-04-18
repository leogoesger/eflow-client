import React from 'react';
import PropTypes from 'prop-types';
import {find, cloneDeep} from 'lodash';

import {metricReference} from '../../../constants/metrics';

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
  const currentMetric = find(
    metricReference,
    metric => metric.name === metricName
  );
  return currentMetric.colors;
};

const BoxplotOverlay = props => {
  if (!props) {
    return null;
  }
  if (props.vertical) {
    const {boxplotData, width} = props;
    return (
      <g>
        <rect
          width={width}
          height={
            props.yScale(boxplotData.whiskers[0]) -
            props.yScale(boxplotData.whiskers[1])
          }
          x={0}
          y={props.yScale(boxplotData.whiskers[1])}
          fill={getColor(props.boxplotData.metricName)[1]}
          fillOpacity={'0.4'}
          transform={props.transform}
        />
        <rect
          width={width}
          height={
            props.yScale(boxplotData.quartile[0]) -
            props.yScale(boxplotData.quartile[2])
          }
          x={0}
          y={props.yScale(boxplotData.quartile[2])}
          fill={getColor(boxplotData.metricName)[0]}
          fillOpacity={'0.3'}
          transform={props.transform}
        />
        <line
          strokeWidth={3}
          stroke={getColor(props.boxplotData.metricName)[0]}
          x1={0}
          x2={width}
          y1={props.yScale(boxplotData.quartile[1])}
          y2={props.yScale(boxplotData.quartile[1])}
          transform={props.transform}
        />
      </g>
    );
  }
  const dataWithOffset = getOffset(props.boxplotData);
  return (
    <g>
      <rect
        width={
          props.xScale(dataWithOffset.whiskers[1]) -
          props.xScale(dataWithOffset.whiskers[0])
        }
        height={props.height}
        x={props.xScale(dataWithOffset.whiskers[0])}
        y={0}
        fill={getColor(props.boxplotData.metricName)[0]}
        fillOpacity={'0.4'}
        transform={props.transform}
      />
      <rect
        width={
          props.xScale(dataWithOffset.quartile[2]) -
          props.xScale(dataWithOffset.quartile[0])
        }
        height={props.height}
        x={props.xScale(dataWithOffset.quartile[0])}
        y={0}
        fill={getColor(props.boxplotData.metricName)[1]}
        fillOpacity={'0.3'}
        transform={props.transform}
      />
      <line
        strokeWidth={3}
        stroke={getColor(props.boxplotData.metricName)[0]}
        x1={props.xScale(dataWithOffset.quartile[1])}
        x2={props.xScale(dataWithOffset.quartile[1])}
        y1={0}
        y2={props.height}
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
  width: PropTypes.number,
  vertical: PropTypes.bool,
};

export default BoxplotOverlay;
