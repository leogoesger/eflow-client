import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default class BoxPlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      boxPlotData: null,
    };
    this.colorScale = d3.scaleOrdinal(d3.schemeCategory20);
    this.xScale = d3.scalePoint();
    this.yScale = d3.scaleLinear();
  }

  componentDidMount() {
    this.updateD3(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateD3(nextProps);
  }

  generateRandomGroups(number) {
    const groupCounts = {};
    const globalCounts = [];
    const meanGenerator = d3.randomUniform(10);

    for (let i = 0; i < number; i++) {
      const randomMean = meanGenerator();
      const generator = d3.randomNormal(randomMean);
      const key = i.toString();
      groupCounts[key] = [];

      for (let j = 0; j < 100; j++) {
        const entry = generator();
        groupCounts[key].push(entry);
        globalCounts.push(entry);
      }
    }

    for (let key in groupCounts) {
      const groupCount = groupCounts[key];
      groupCounts[key] = groupCount.sort((a, b) => a - b);
    }
    return {groupCounts: groupCounts, globalCounts: globalCounts};
  }

  boxQuartiles(data) {
    return [
      d3.quantile(data, 0.25),
      d3.quantile(data, 0.5),
      d3.quantile(data, 0.75),
    ];
  }

  getBoxPlotData(groupCounts) {
    const boxPlotData = [];
    Object.keys(groupCounts).forEach(key => {
      const record = {};
      const localExtent = d3.extent(groupCounts[key]);

      record['key'] = key;
      record['counts'] = groupCounts[key];
      record['quartile'] = this.boxQuartiles(groupCounts[key]);
      record['whiskers'] = localExtent;
      record['color'] = this.colorScale(key);

      boxPlotData.push(record);
    });
    return boxPlotData;
  }

  updateD3(props) {
    const {groupCounts, globalCounts} = this.generateRandomGroups(7);
    const boxPlotData = this.getBoxPlotData(groupCounts);
    const globalExtent = d3.extent(globalCounts);

    this.colorScale.domain(Object.keys(groupCounts));
    this.xScale
      .domain(Object.keys(groupCounts))
      .rangeRound([0, props.width])
      .padding([0.5]);
    this.yScale.domain(globalExtent).range([props.height, 0]);

    this.setState({boxPlotData: boxPlotData});
  }

  _drawVerticalLines(boxPlotData) {
    if (!boxPlotData) {
      return null;
    }
    return boxPlotData.map(data => {
      return (
        <line
          key={data.key}
          strokeWidth={1}
          stroke={'#000'}
          x1={this.xScale(data.key) + 15}
          x2={this.xScale(data.key) + 15}
          y1={this.yScale(data.whiskers[1])}
          y2={this.yScale(data.whiskers[0])}
        />
      );
    });
  }
  _drawBoxes(boxPlotData) {
    if (!boxPlotData) {
      return null;
    }
    return boxPlotData.map(data => {
      return (
        <rect
          key={data.key}
          width={30}
          height={this.yScale(data.quartile[0]) - this.yScale(data.quartile[2])}
          x={this.xScale(data.key)}
          y={this.yScale(data.quartile[2])}
          fill={data.color}
          stroke={'#000'}
          strokeWidth={1}
        />
      );
    });
  }
  _drawHorizontalLines(boxPlotData) {
    if (!boxPlotData) {
      return null;
    }
    return boxPlotData.map(data => {
      return (
        <g key={data.key}>
          <line
            strokeWidth={1}
            stroke={'#000'}
            x1={this.xScale(data.key)}
            x2={this.xScale(data.key) + 30}
            y1={this.yScale(data.whiskers[0])}
            y2={this.yScale(data.whiskers[0])}
          />
          <line
            strokeWidth={1}
            stroke={'#000'}
            x1={this.xScale(data.key)}
            x2={this.xScale(data.key) + 30}
            y1={this.yScale(data.whiskers[1])}
            y2={this.yScale(data.whiskers[1])}
          />
          <line
            strokeWidth={1}
            stroke={'#000'}
            x1={this.xScale(data.key)}
            x2={this.xScale(data.key) + 30}
            y1={this.yScale(data.quartile[1])}
            y2={this.yScale(data.quartile[1])}
          />
        </g>
      );
    });
  }

  render() {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        transform={`translate(${this.props.x}, ${this.props.y})`}
      >
        <g>
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
};
