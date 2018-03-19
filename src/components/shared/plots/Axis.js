/* eslint-disable */
import React, {Component} from 'react';
import * as d3 from 'd3';

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

const dateFromDay = (year, day) => {
  var date = new Date(year, 0); // initialize a date in `year-01-01`
  return new Date(date.setDate(day)); // add the number of days
};

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getCalenderDate = offsetJulianDate => {
  let julianDate;
  if (offsetJulianDate < 365 - 274) {
    julianDate = 274 + offsetJulianDate;
  } else {
    julianDate = offsetJulianDate - 365 + 274;
  }
  const date = dateFromDay(2001, julianDate),
    calenderDate = `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`;
  return calenderDate;
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
        if (d == 1 || d == this.props.data.length) {
          return null;
        }
        return getCalenderDate(d);
      });
    d3.select(this.anchor).call(axis);
  } else {
    const axis = d3
      .axisLeft()
      .tickSize(-this.props.gridLength, 0, 10)
      .tickSizeOuter(0)
      .scale(this.props.scale)

      .ticks(5);
    d3.select(this.anchor).call(axis);
  }
});

export default Axis;
