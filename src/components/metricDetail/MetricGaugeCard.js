import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';

import Card, {CardHeader} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {classInfo} from '../../constants/classification';
import {SimpleLinePlot} from '../shared/plots';

class MetricGaugeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: this.props.annualFlowData.Years.year[0],
      zoomTransform: null,
    };
    this.zoom = d3
      .zoom()
      .scaleExtent([-10, 10])
      .translateExtent([[-100, -100], [700 + 100, 420 + 100]])
      .extent([[-100, -100], [700 + 100, 420 + 100]])
      .on('zoom', () => this.zoomed());
  }

  componentDidMount() {
    d3.select(this.svg).call(this.zoom);
  }

  componentDidUpdate() {
    d3.select(this.svg).call(this.zoom);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.annualFlowData.Years.gaugeId !==
      this.props.annualFlowData.Years.gaugeId
    ) {
      this.setState({currentYear: nextProps.annualFlowData.Years.year[0]});
    }
  }

  zoomed() {
    this.setState({
      zoomTransform: d3.event.transform,
    });
  }

  async _handleSlider(e, v) {
    await this.setState({currentYear: v});
    this.props.fetchAnnualFlowData({
      gaugeId: this.props.annualFlowData.Years.gaugeId,
      year: this.state.currentYear,
    });
  }

  _getAnnualFlowData() {
    const {flowData} = this.props.annualFlowData.AnnualFlows;
    const flowObjects = flowData.map((d, i) => {
      return {date: i, flow: Number(d)};
    });
    return flowObjects;
  }

  _renderAnnualPlot() {
    const {flowData} = this.props.annualFlowData.AnnualFlows;
    const filteredData = flowData.filter(d => d === 'NaN');

    if (filteredData.length > 200) {
      return (
        <div style={{height: '420px'}}>
          {'Sorry, there are more than 200 NaN in the dataset!'}
        </div>
      );
    }
    return (
      <svg
        width={700}
        height={410}
        ref={el => (this.svg = el)}
        style={{cursor: 'pointer'}}
      >
        <SimpleLinePlot
          x={70}
          y={40}
          width={600}
          height={300}
          data={this._getAnnualFlowData()}
          xValue={value => value.date}
          yValue={value => value.flow}
          color={'#2196f3'}
          zoomTransform={this.state.zoomTransform}
          zoomType="detail"
        />
      </svg>
    );
  }
  render() {
    const {annualFlowData} = this.props,
      classObject = classInfo[`class${annualFlowData.Gauge.classId}`];

    return (
      <Card
        style={{
          width: '65%',
          height: '600px',
          overflow: 'scroll',
          margin: '0 auto',
        }}
      >
        <CardHeader
          title={annualFlowData.Gauge.stationName}
          subtitle={`ID: ${annualFlowData.Gauge.id}, Class: ${
            classObject.fullName
          }`}
          subtitleStyle={{color: classObject.colors[0]}}
          actAsExpander={false}
          showExpandableButton={false}
        />
        <Divider />

        <Paper style={{width: '90%', overflow: 'hidden', margin: '30px auto'}}>
          {this._renderAnnualPlot()}
        </Paper>

        <Slider
          min={this.props.annualFlowData.Years.year[0]}
          max={
            this.props.annualFlowData.Years.year[
              this.props.annualFlowData.Years.year.length - 1
            ]
          }
          step={1}
          style={{width: '600px', margin: '0 auto'}}
          value={this.state.currentYear}
          onChange={(e, v) => this._handleSlider(e, v)}
        />
      </Card>
    );
  }
}

MetricGaugeCard.propTypes = {
  annualFlowData: PropTypes.object,
  fetchAnnualFlowData: PropTypes.func,
};

export default MetricGaugeCard;
