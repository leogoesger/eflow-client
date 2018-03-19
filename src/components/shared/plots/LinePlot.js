import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import Axis from './Axis';

export default class LinePlot extends React.Component {
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
    let {data, width, height} = props;

    this.xScale
      .domain(d3.extent(data.NINTY, d => this.props.xValue(d)))
      .range([0, width]);

    this.yScale.domain([0, d3.max(data.NINTY, d => d.flow)]).range([height, 0]);

    this.line
      .x(d => this.xScale(this.props.xValue(d)))
      .y(d => this.yScale(this.props.yValue(d)))
      .curve(d3.curveCardinal);
  }

  render() {
    const transform = `translate(${this.props.x}, ${this.props.y})`;
    if (this.line(this.props.data.NINTY)) {
      return (
        <svg width={this.props.width + 100} height={this.props.height + 100}>
          <g style={{fill: 'none'}}>
            <Axis
              scale={this.xScale}
              data={this.props.data.NINTY}
              x={this.props.x}
              gridLength={this.props.height}
              y={this.props.y + this.props.height + 0}
              orientation="bottom"
            />
            <Axis
              scale={this.yScale}
              data={this.props.data.NINTY}
              x={this.props.x}
              y={this.props.y}
              gridLength={this.props.width}
              orientation="left"
            />
            <path
              transform={transform}
              d={this.line(this.props.data.NINTY)}
              strokeLinecap="round"
              strokeWidth="3"
              stroke="#2196f3"
            />
            <path
              transform={transform}
              d={this.line(this.props.data.SEVENTYFIVE)}
              strokeLinecap="round"
              strokeWidth="3"
              stroke="#4fc3f7"
            />
            <path
              transform={transform}
              d={this.line(this.props.data.FIFTY)}
              strokeLinecap="round"
              strokeWidth="3"
              stroke="#ef5350"
            />
            <path
              transform={transform}
              d={this.line(this.props.data.TWENTYFIVE)}
              strokeLinecap="round"
              strokeWidth="3"
              stroke="#4fc3f7"
            />
            <path
              transform={transform}
              d={this.line(this.props.data.TEN)}
              strokeLinecap="round"
              strokeWidth="3"
              stroke="#2196f3"
            />
          </g>
        </svg>
      );
    } else {
      return null;
    }
  }
}

LinePlot.defaultProps = {
  width: 400,
};

LinePlot.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  data: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  xValue: PropTypes.func,
  yValue: PropTypes.func,
};
