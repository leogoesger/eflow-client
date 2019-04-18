/* eslint-disable react/no-find-dom-node */
import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import Axis from './Axis';
import BoxplotOverlay from './BoxplotOverlay';
import { getCalenderDateFromOffset } from '../../../utils/helpers';

const keyMapping = {
  TEN: (
    <span>
      10<sup>th</sup>
    </span>
  ),
  TWENTYFIVE: (
    <span>
      25<sup>th</sup>
    </span>
  ),
  FIFTY: (
    <span>
      50<sup>th</sup>
    </span>
  ),
  SEVENTYFIVE: (
    <span>
      75<sup>th</sup>
    </span>
  ),
  NINTY: (
    <span>
      90<sup>th</sup>
    </span>
  ),
  MAX: <span>MAX</span>,
  MIN: <span>MIN</span>,
  TWENTY_FIVE: (
    <span>
      25<sup>th</sup>
    </span>
  ),
  SEVENTY_FIVE: (
    <span>
      75<sup>th</sup>
    </span>
  )
};

export default class LinePlot extends React.Component {
  constructor(props) {
    super(props);
    this.xScale = d3.scaleLinear();
    this.yScale = d3.scaleLinear();
    this.line = d3.line();
    this.updateD3(props);
    this.state = {
      toolTipData: [],
      displayTips: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.updateD3(nextProps);
  }

  updateD3(props) {
    let { data, width, height, highestKey, zoomTransform, zoomType } = props;

    let [min, max] = d3.extent(data[highestKey], d => this.props.xValue(d));

    /* Uncomment below code to rescale X axis based on highest 90% data when comparing*/
    // if (highestKey === "ninty") {
    //   if (data["NINTY"]) {
    //     let [minNINTY, maxNINTY] = d3.extent(data["NINTY"], d =>
    //       this.props.xValue(d)
    //     );

    //     min = minNINTY <= min ? minNINTY : min;
    //     max = maxNINTY >= max ? maxNINTY : max;
    //   }
    // }

    this.xScale.domain([min, max]).range([0, width]);

    let yMax = d3.max(data[highestKey], d => Number(d.flow));

    /* Uncomment below code to rescale Y axis based on highest 90% data when comparing*/
    // if (highestKey === "ninty") {
    //   if (data["NINTY"]) {
    //     let maxNINTY = d3.max(data["NINTY"], d => Number(d.flow));

    //     yMax = maxNINTY >= yMax ? maxNINTY : yMax;
    //   }
    // }

    this.yScale.domain([0, yMax]).range([height, 0]);

    this.line
      .x(d => this.xScale(this.props.xValue(d)))
      .y(d => this.yScale(this.props.yValue(d)))
      .curve(d3.curveCardinal);

    if (zoomTransform && zoomType === 'detail') {
      this.xScale.domain(zoomTransform.rescaleX(this.xScale).domain());
      this.yScale.domain(zoomTransform.rescaleY(this.yScale).domain());
    }

    //tooltip
    d3.selectAll('path').on('mousemove', () => {
      this.handleMouseMove(d3.mouse(d3.event.currentTarget));
    });
  }

  componentDidUpdate() {
    d3.selectAll('svg')
      .on('mouseenter', () => {
        this.setState({ displayTips: true });
      })
      .on('mouseleave', () => {
        this.setState({ displayTips: false });
      });
  }

  _transform() {
    const { zoomTransform, zoomType } = this.props;
    let x = 0,
      y = 0;
    let transform = '';

    if (zoomTransform && zoomType === 'scale') {
      transform = `translate(${x + zoomTransform.x}, ${y +
        zoomTransform.y}) scale(${zoomTransform.k})`;
    } else {
      transform = `translate(${x}, ${y})`;
    }

    return transform;
  }

  async findClosest(data, value, accessor) {
    const elements = await Object.keys(data).map(key => {
      const array = data[key];
      if (!array || !array.length) {
        return null;
      }

      const bisect = d3.bisector(accessor).right;
      const pointIndex = bisect(array, value);
      const left = array[pointIndex - 1],
        right = array[pointIndex];

      let element;

      // take the closer element
      if (left && right) {
        element =
          Math.abs(value - accessor(left)) < Math.abs(value - accessor(right))
            ? left
            : right;
      } else if (left) {
        element = left;
      } else {
        element = right;
      }
      return { [key]: { ...element } };
    });
    return elements;
  }

  async handleMouseMove([mouseX, mouseY]) {
    // find nearest data point
    const { data, xValue } = this.props;

    // convert the mouse x and y to the domain x and y using our chart scale
    let domainX = this.xScale.invert(mouseX);
    let domainY = this.yScale.invert(mouseY);

    // if the mouse is outside the domain, consider it having exited
    if (
      domainX < this.xScale.domain()[0] ||
      domainX > this.xScale.domain()[1]
    ) {
      domainX = null;
    }
    if (
      domainY < this.yScale.domain()[0] ||
      domainY > this.yScale.domain()[1]
    ) {
      domainY = null;
    }

    // send an action indicating which point to highlight if we are near one, otherwise indicate
    // no point should be highlighted.
    if (
      domainX !== null &&
      domainY !== null &&
      mouseX != null &&
      mouseY != null
    ) {
      // find the nearest point to the x value
      const toolTipData = await this.findClosest(data, domainX, d => xValue(d));
      this.setState({ toolTipData });
    } else {
      return;
    }
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

  renderToolTips() {
    const { toolTipData } = this.state;
    let date = null;
    if (toolTipData && toolTipData[0]['ten' || 'TEN']) {
      let jDate = toolTipData[0]['ten' || 'TEN'].date;
      date = getCalenderDateFromOffset(jDate);
    }

    return (
      this.state.displayTips && (
        <foreignObject
          style={{
            x: '550',
            y: '0',
            width: '50',
            height: '100',
            opacity: '0.6',
            background: 'white',
            border: 'black',
            borderWidth: '1px'
          }}
        >
          <div
            style={{
              fontSize: '9px'
            }}
          >
            {toolTipData && (
              <div>
                {date && <span>{date}</span>}
                {toolTipData.map((tip, indx) => {
                  if (tip === null) return;
                  const key = Object.keys(tip)[0];
                  return (
                    <div key={indx}>
                      {keyMapping[key.toUpperCase()]} : {tip[key].flow}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </foreignObject>
      )
    );
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
      width
    } = this.props;
    const transform = `translate(${x}, ${y})`;
    if (this.line(data[highestKey])) {
      return (
        <g style={{ fill: 'none' }} transform={this._transform()}>
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
          {this.renderToolTips()}
        </g>
      );
    } else {
      return null;
    }
  }
}

LinePlot.defaultProps = {
  width: 400
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
  zoomTransform: PropTypes.object,
  zoomType: PropTypes.string
};
