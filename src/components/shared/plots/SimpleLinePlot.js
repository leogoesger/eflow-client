import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

import { metricReference } from "../../../constants/metrics";
import { getJulianOffsetDate } from "../../../utils/helpers";
import Axis from "./Axis";
import { Colors } from "../../../styles";

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
    let {
      xValue,
      yValue,
      data,
      width,
      height,
      zoomTransform,
      zoomType,
      logScale,
      yMax,
      fixedYaxisPercentile,
    } = props;

    if (logScale) {
      this.yScale = d3.scaleLog();
    } else {
      this.yScale = d3.scaleLinear();
    }

    this.xScale.domain(d3.extent(data, d => xValue(d))).range([0, width]);
    let yExtent = d3.extent(data, d => yValue(d));
    if (fixedYaxisPercentile) {
      yExtent[1] = yMax;
    }
    this.yScale.domain(yExtent).range([height, 0]);

    this.line
      .defined(d => {
        return !isNaN(d.flow);
      })
      .x(d => this.xScale(xValue(d)))
      .y(d => this.yScale(yValue(d)))
      .curve(d3.curveCardinal);

    if (zoomTransform && zoomType === "detail") {
      this.xScale.domain(zoomTransform.rescaleX(this.xScale).domain());
      this.yScale.domain(zoomTransform.rescaleY(this.yScale).domain());
    }
  }

  _transform() {
    const { zoomTransform, zoomType } = this.props;
    let x = 0,
      y = 0;
    let transform = "";

    if (zoomTransform && zoomType === "scale") {
      transform = `translate(${x + zoomTransform.x}, ${y +
        zoomTransform.y}) scale(${zoomTransform.k})`;
    } else {
      transform = `translate(${x}, ${y})`;
    }

    return transform;
  }

  _renderOverLay(transform) {
    
    const { annualFlowData, toggledMetrics } = this.props;
    if(!annualFlowData) return null;
    return Object.keys(annualFlowData).map(tableName => {
      return Object.keys(annualFlowData[tableName]).map(columnName => {
        const currentMetric = metricReference.filter(
          m =>
            m.tableName === tableName &&
            m.columnName === columnName &&
            toggledMetrics.some(
              metric =>
                metric.tableName === tableName &&
                metric.columnName === columnName
            )
        )[0];

        if (!currentMetric || !currentMetric.dimUnit) {
          return null;
        }
        const metricValue = Number(annualFlowData[tableName][columnName]);

        if (currentMetric.dimUnit === "cfs" && metricValue) {
          return (
            <line
              transform={transform}
              key={currentMetric.name}
              strokeWidth={3}
              stroke={currentMetric.colors[0]}
              x1={0}
              x2={this.props.width}
              y1={this.yScale(metricValue)}
              y2={this.yScale(metricValue)}
            />
          );
        } else if (currentMetric.dimUnit === "Date" && metricValue) {
          return (
            <line
              transform={transform}
              key={currentMetric.name}
              strokeWidth={3}
              stroke={currentMetric.colors[0]}
              x1={this.xScale(getJulianOffsetDate(metricValue))}
              x2={this.xScale(getJulianOffsetDate(metricValue))}
              y1={this.props.height}
              y2={0}
            />
          );
        } else {
          return null;
        }
      });
    });
  }

  _renderHydrograph(transform) {
    if (!this.props.isHydrographOverlay || !this.props.hydrograph) {
      return null;
    }

    return Object.keys(this.props.hydrograph).map(key => {
      return (
        <path
          key={key}
          transform={transform}
          d={this.line(this.props.hydrograph[key])}
          strokeLinecap="round"
          strokeWidth="3"
          stroke={Colors[key]}
          opacity="0.25"
        />
      );
    });
  }

  render() {
    const { data, x, y, height, width } = this.props;
    const transform = `translate(${x}, ${y})`;
    return (
      <g style={{ fill: "none" }} transform={this._transform()}>
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
        {this._renderHydrograph(transform)}
        <path
          transform={transform}
          d={this.line(this.props.data)}
          strokeLinecap="round"
          strokeWidth="3"
          stroke={this.props.color}
        />
        {this._renderOverLay(transform)}
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
  logScale: PropTypes.bool,
  toggledMetrics: PropTypes.array,
  annualFlowData: PropTypes.object,
  isHydrographOverlay: PropTypes.bool,
  hydrograph: PropTypes.object,
  yMax: PropTypes.number,
  fixedYaxisPercentile: PropTypes.number,
};
