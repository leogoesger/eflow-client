import React from 'react';
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
    this.updateD3(props);
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

  render() {
    return null;
  }
}
