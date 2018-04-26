import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import Axis from './Axis';

export default class SimpleLinePlot extends React.Component {
  constructor(props) {
    super(props);
    this.xScale = d3.scaleLinear();
    this.yScale = d3.scaleLinear();
    this.line = d3.line();
    this.updateD3(props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateD3(nextProps);
  }

  updateD3(props) {
    let {xValue, yValue, data, width, height, zoomTransform, zoomType} = props;
    this.xScale.domain(d3.extent(data, d => xValue(d))).range([0, width]);

    this.yScale.domain([0, d3.max(data, d => yValue(d))]).range([height, 0]);

    this.line
      .defined(d => {
        return !isNaN(d.flow);
      })
      .x(d => this.xScale(xValue(d)))
      .y(d => this.yScale(yValue(d)));

    if (zoomTransform && zoomType === 'detail') {
      this.xScale.domain(zoomTransform.rescaleX(this.xScale).domain());
      this.yScale.domain(zoomTransform.rescaleY(this.yScale).domain());
    }
  }

  _transform() {
    const {zoomTransform, zoomType} = this.props;
    let x = 0,
      y = 0;
    let transform = '';

    if (zoomTransform && zoomType === 'scale') {
      transform = `translate(${x + zoomTransform.x}, ${y +
        zoomTransform.y}) scale(${zoomTransform.k})`;
    } else {
      transform = `translate(${x}, ${y})`;
    }

    return transform;
  }

  render() {
    const {data, x, y, height, width} = this.props;
    const transform = `translate(${x}, ${y})`;
    return (
      <g style={{fill: 'none'}} transform={this._transform()}>
        <Axis
          scale={this.xScale}
          data={data}
          x={x}
          gridLength={height}
          y={y + height + 0}
          orientation="bottom"
        />
        <Axis
          scale={this.yScale}
          data={data}
          x={x}
          y={y}
          gridLength={width}
          orientation="left"
        />
        <path
          transform={transform}
          d={this.line(this.props.data)}
          strokeLinecap="round"
          strokeWidth="3"
          stroke={this.props.color}
        />
      </g>
    );
  }
}

SimpleLinePlot.defaultProps = {
  width: 400,
};

SimpleLinePlot.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  xValue: PropTypes.func,
  yValue: PropTypes.func,
  color: PropTypes.string,
  zoomTransform: PropTypes.object,
  zoomType: PropTypes.string,
};
