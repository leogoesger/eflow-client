import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import Axis from './Axis';
import {classInfo} from '../../../constants/classification';

export default class BoxPlot extends React.Component {
  constructor(props) {
    super(props);
    this.xScale = d3.scalePoint();
    this.yScale = d3.scaleLinear();
  }

  componentDidMount() {
    this.updateD3(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateD3(nextProps);
  }

  combineWiskers(props) {
    const combinedData = [];
    props.boxPlotData.forEach(d => {
      combinedData.push(d.whiskers[0]);
      combinedData.push(d.whiskers[1]);
    });
    return combinedData;
  }

  updateD3(props) {
    if (props.logScale) {
      this.yScale = d3.scaleLog();
    } else {
      this.yScale = d3.scaleLinear();
    }
    const boxPlotData = props.boxPlotData,
      globalExtent = d3.extent(this.combineWiskers(props)),
      groupCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    this.xScale.domain(groupCounts).rangeRound([0, props.width - 30]);
    this.yScale.domain(globalExtent).range([props.height - 20, 0]);
    this.setState({boxPlotData: boxPlotData});
  }

  _drawVerticalLines(boxPlotData) {
    return boxPlotData.map(data => {
      return (
        <line
          key={data.classId}
          strokeWidth={1}
          stroke={'#000'}
          x1={this.xScale(data.classId) + 15}
          x2={this.xScale(data.classId) + 15}
          y1={this.yScale(data.whiskers[1])}
          y2={this.yScale(data.whiskers[0])}
        />
      );
    });
  }
  _drawBoxes(boxPlotData) {
    return boxPlotData.map(data => {
      return (
        <rect
          key={data.classId}
          width={30}
          height={this.yScale(data.quartile[0]) - this.yScale(data.quartile[2])}
          x={this.xScale(data.classId)}
          y={this.yScale(data.quartile[2])}
          fill={classInfo[`class${data.classId}`].colors[0]}
          stroke={'#000'}
          strokeWidth={1}
        />
      );
    });
  }
  _drawHorizontalLines(boxPlotData) {
    return boxPlotData.map(data => {
      return (
        <g key={data.classId}>
          <line
            strokeWidth={1}
            stroke={'#000'}
            x1={this.xScale(data.classId)}
            x2={this.xScale(data.classId) + 30}
            y1={this.yScale(data.whiskers[0])}
            y2={this.yScale(data.whiskers[0])}
          />
          <line
            strokeWidth={1}
            stroke={'#000'}
            x1={this.xScale(data.classId)}
            x2={this.xScale(data.classId) + 30}
            y1={this.yScale(data.whiskers[1])}
            y2={this.yScale(data.whiskers[1])}
          />
          <line
            strokeWidth={1}
            stroke={'#000'}
            x1={this.xScale(data.classId)}
            x2={this.xScale(data.classId) + 30}
            y1={this.yScale(data.quartile[1])}
            y2={this.yScale(data.quartile[1])}
          />
        </g>
      );
    });
  }

  render() {
    if (!this.state || !this.state.boxPlotData) {
      return null;
    }
    return (
      <svg width={this.props.width} height={this.props.height}>
        <Axis
          scale={this.yScale}
          x={60}
          y={this.props.y}
          gridLength={this.props.width}
          orientation="left"
        />
        <g transform={`translate(${this.props.x}, ${this.props.y})`}>
          {this._drawVerticalLines(this.state.boxPlotData)}
          {this._drawBoxes(this.state.boxPlotData)}
          {this._drawHorizontalLines(this.state.boxPlotData)}
        </g>
      </svg>
    );
  }
}

BoxPlot.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  boxPlotData: PropTypes.array,
};
