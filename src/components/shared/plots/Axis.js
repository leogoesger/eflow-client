/* eslint-disable */
import React, {Component} from 'react';
import * as d3 from 'd3';
import {classInfo} from '../../../constants/classification';
import {getCalenderDate} from '../../../utils/helpers';

const blackBox = D3render => {
  return class Blackbox extends Component {
    componentDidMount() {
      D3render.call(this);
    }
    componentDidUpdate() {
      D3render.call(this);
    }

    render() {
      if (this.props.orientation === 'bottom') {
        let {x, y} = this.props;
        return (
          <g
            transform={`translate(${x}, ${y})`}
            ref={anchor => (this.anchor = anchor)}
          />
        );
      } else {
        const {x, y} = this.props;
        return (
          <g
            transform={`translate(${x}, ${y})`}
            ref={anchor => (this.anchor = anchor)}
          />
        );
      }
    }
  };
};

const Axis = blackBox(function() {
  if (this.props.orientation === 'bottom') {
    const axis = d3
      .axisBottom()
      .scale(this.props.scale)
      .tickSize(-this.props.gridLength, 0, 10)
      .tickSizeOuter(0)
      .ticks(10)
      .tickFormat(d => {
        if (d == 9.1) {
          return null;
        }
        if (this.props.format === 'className') {
          return classInfo[`class${d}`] ? classInfo[`class${d}`].abbre : d;
        }
        if (d == 1 || d == this.props.data.length) {
          return null;
        }
        return getCalenderDate(d);
      })
      .tickPadding(8);
    d3.select(this.anchor).call(axis);
  } else {
    const axis = d3
      .axisLeft()
      .tickSize(-this.props.gridLength, 0, 10)
      .tickSizeOuter(0)
      .scale(this.props.scale)
      .ticks(5)
      .tickPadding(5);
    d3.select(this.anchor).call(axis);
  }
});

export default Axis;
