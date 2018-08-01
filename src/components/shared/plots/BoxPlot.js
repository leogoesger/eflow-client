import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

import Axis from "./Axis";
import { classInfo } from "../../../constants/classification";

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
    const {
      boxPlotData,
      logScale,
      width,
      height,
      zoomTransform,
      zoomType,
    } = props;
    if (logScale) {
      this.yScale = d3.scaleLog();
    } else {
      this.yScale = d3.scaleLinear();
    }
    const globalExtent = d3.extent(this.combineWiskers(props)),
      groupCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    this.xScale.domain(groupCounts).rangeRound([0, width - 120]);
    this.yScale.domain(globalExtent).range([height - 30, 0]);
    this.setState({ boxPlotData: boxPlotData });

    if (zoomTransform && zoomType === "detail") {
      // this.xScale.domain(zoomTransform.rescaleX(this.xScale).domain());
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

  _drawVerticalLines(boxPlotData) {
    return boxPlotData.map(data => {
      return (
        <line
          key={data.classId}
          strokeWidth={1}
          stroke={"#000"}
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
          stroke={"#000"}
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
            stroke={"#000"}
            x1={this.xScale(data.classId)}
            x2={this.xScale(data.classId) + 30}
            y1={this.yScale(data.whiskers[0])}
            y2={this.yScale(data.whiskers[0])}
          />
          <line
            strokeWidth={1}
            stroke={"#000"}
            x1={this.xScale(data.classId)}
            x2={this.xScale(data.classId) + 30}
            y1={this.yScale(data.whiskers[1])}
            y2={this.yScale(data.whiskers[1])}
          />
          <line
            strokeWidth={1}
            stroke={"#000"}
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
      <g transform={this._transform()}>
        <Axis
          scale={this.yScale}
          x={70}
          y={this.props.y}
          gridLength={this.props.width - 50}
          orientation="left"
          timing={this.props.boxPlotData[0].metricName.includes("Timing")}
        />
        <Axis
          scale={this.xScale}
          data={this.state.boxPlotData}
          x={95}
          y={this.props.height - 10}
          gridLength={0}
          orientation="bottom"
          format={"className"}
        />

        <g transform={`translate(${this.props.x}, ${this.props.y})`}>
          {this._drawVerticalLines(this.state.boxPlotData)}
          {this._drawBoxes(this.state.boxPlotData)}
          {this._drawHorizontalLines(this.state.boxPlotData)}
        </g>
      </g>
    );
  }
}

BoxPlot.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  boxPlotData: PropTypes.array,
  zoomTransform: PropTypes.object,
  zoomType: PropTypes.string,
};
