import React from 'react';
import PropTypes from 'prop-types';
import {find} from 'lodash';

import {metricReference} from '../../../constants/metrics';

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
    if (
      [
        'winterMagnitude2',
        'winterMagnitude5',
        'winterMagnitude10',
        'winterMagnitude20',
      ].indexOf(boxplotData.metricName) !== -1
    ) {
      return (
        <g>
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
  return (
    <g>
      <rect
        width={
          props.xScale(props.boxplotData.whiskers[1]) -
          props.xScale(props.boxplotData.whiskers[0])
        }
        height={props.height}
        x={props.xScale(props.boxplotData.whiskers[0])}
        y={0}
        fill={getColor(props.boxplotData.metricName)[0]}
        fillOpacity={'0.4'}
        transform={props.transform}
      />
      <rect
        width={
          props.xScale(props.boxplotData.quartile[2]) -
          props.xScale(props.boxplotData.quartile[0])
        }
        height={props.height}
        x={props.xScale(props.boxplotData.quartile[0])}
        y={0}
        fill={getColor(props.boxplotData.metricName)[1]}
        fillOpacity={'0.3'}
        transform={props.transform}
      />
      <line
        strokeWidth={3}
        stroke={getColor(props.boxplotData.metricName)[0]}
        x1={props.xScale(props.boxplotData.quartile[1])}
        x2={props.xScale(props.boxplotData.quartile[1])}
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
