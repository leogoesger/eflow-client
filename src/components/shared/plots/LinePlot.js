import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

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
    const {data, width, height, margin} = props;

    // const parseDate = d3.timeParse('%m-%d-%Y');
    // data.forEach(d => (d.date = parseDate(d.date)));
    // console.log(data, width, height, margin);

    this.xScale
      .domain(d3.extent(data, d => d.date))
      .range([0, width - margin.left - margin.right]);

    this.yScale.domain([0, d3.max(data, d => d.flow + 5)]).range([height, 0]);

    this.line
      .x(d => this.xScale(d.date))
      .y(d => this.yScale(d.flow))
      .curve(d3.curveCardinal);
  }

  render() {
    const transform = `translate(${this.props.x}, ${this.props.y})`;
    if (this.line(this.props.data)) {
      return (
        <svg width={this.props.width} height={this.props.height}>
          <g transform={transform} style={{fill: 'none', stroke: '#000'}}>
            <path d={this.line(this.props.data)} strokeLinecap="round" />
          </g>
        </svg>
      );
    }
  }
}

LinePlot.defaultProps = {
  width: 400,
};

LinePlot.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.object,
};
