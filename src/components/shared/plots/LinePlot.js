import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import Axis from './Axis';
import BoxplotOverlay from './BoxplotOverlay';

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
    let {data, width, height, highestKey} = props;
    debugger; //eslint-disable-line
    this.xScale
      .domain(d3.extent(data[highestKey], d => this.props.xValue(d)))
      .range([0, width]);

    this.yScale
      .domain([0, d3.max(data[highestKey], d => Number(d.flow))])
      .range([height, 0]);

    this.line
      .x(d => this.xScale(this.props.xValue(d)))
      .y(d => this.yScale(this.props.yValue(d)))
      .curve(d3.curveCardinal);
  }

  renderLines(transform) {
    return Object.keys(this.props.data).map(key => {
      return (
        <path
          key={key}
          transform={transform}
          d={this.line(this.props.data[key])}
          strokeLinecap="round"
          strokeWidth="3"
          stroke={this.props.colors[key]}
        />
      );
    });
  }

  renderBoxplots(overLayBoxPlotData) {
    return overLayBoxPlotData.map((d, i) => {
      return (
        <BoxplotOverlay
          key={i}
          boxplotData={d}
          xScale={this.xScale}
          yScale={this.yScale}
          height={this.props.height}
          transform={`translate(${this.props.x}, ${this.props.y})`}
          data={this.props.data}
        />
      );
    });
  }

  renderVerticalBoxPlots(verticalOverlayBoxPlotData) {
    return verticalOverlayBoxPlotData.map((d, i) => {
      return (
        <BoxplotOverlay
          key={i}
          boxplotData={d}
          vertical={true}
          xScale={this.xScale}
          yScale={this.yScale}
          height={this.props.height}
          width={this.props.width}
          transform={`translate(${this.props.x}, ${this.props.y})`}
          data={this.props.data}
        />
      );
    });
  }

  render() {
    const {
      data,
      highestKey,
      overLayBoxPlotData,
      verticalOverlayBoxPlotData,
      x,
      y,
      height,
      width,
    } = this.props;
    const transform = `translate(${x}, ${y})`;
    if (this.line(data[highestKey])) {
      return (
        <svg width={620} height={height + 100} style={{marginLeft: '10px'}}>
          <g style={{fill: 'none'}}>
            <Axis
              scale={this.xScale}
              data={data[highestKey]}
              x={x}
              gridLength={height}
              y={y + height + 0}
              orientation="bottom"
            />
            <Axis
              scale={this.yScale}
              data={data[highestKey]}
              x={x}
              y={y}
              gridLength={width}
              orientation="left"
            />
            {this.renderBoxplots(overLayBoxPlotData)}
            {this.renderVerticalBoxPlots(verticalOverlayBoxPlotData)}
            {this.renderLines(transform)}
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
  highestKey: PropTypes.string,
  colors: PropTypes.object,
  overLayBoxPlotData: PropTypes.array,
  verticalOverlayBoxPlotData: PropTypes.array,
};
