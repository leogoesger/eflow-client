import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Setting from 'material-ui/svg-icons/action/settings';

import Card, {CardHeader} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {classInfo} from '../../constants/classification';
import {SimpleLinePlot} from '../shared/plots';
import {Colors} from '../../styles';

class MetricGaugeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: this.props.annualFlowData.Years.year[1],
      zoomTransform: null,
      isDrawerOpen: false,
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

  _toggleDrawer() {
    this.setState({isDrawerOpen: !this.state.isDrawerOpen});
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

  _renderSliderHelper() {
    const {year} = this.props.annualFlowData.Years;

    return (
      <div
        style={{
          display: 'flex',
          width: '780px',
          margin: '0 auto',
          justifyContent: 'space-around',
          fontSize: '14px',
          color: Colors.lightGrey,
        }}
      >
        <div>{year[0]}</div>
        <div>{'Slide the bar to change the water year!'}</div>
        <div>{year[year.length - 1]}</div>
      </div>
    );
  }

  _renderAnnualPlot() {
    const {flowData} = this.props.annualFlowData.AnnualFlows;
    const filteredData = flowData.filter(d => d === 'NaN');

    if (filteredData.length > 200) {
      return (
        <div style={{height: '399px'}}>
          {'Sorry, there are more than 200 NaN in the dataset!'}
        </div>
      );
    }
    return (
      <React.Fragment>
        <div style={styles.yLabel}>{'Flow Value (cfs)'}</div>
        <div style={styles.xLabel}>{`Water year hydrograph for ${
          this.state.currentYear
        }`}</div>
        <svg
          width={700}
          height={360}
          ref={el => (this.svg = el)}
          style={{cursor: 'pointer'}}
        >
          <SimpleLinePlot
            x={70}
            y={20}
            width={600}
            height={300}
            data={this._getAnnualFlowData()}
            xValue={value => value.date}
            yValue={value => value.flow}
            color={Colors.blue}
            zoomTransform={this.state.zoomTransform}
            zoomType="detail"
          />
        </svg>
      </React.Fragment>
    );
  }

  render() {
    if (!this.props.annualFlowData) {
      return null;
    }
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
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <CardHeader
            title={annualFlowData.Gauge.stationName}
            subtitle={`ID: ${annualFlowData.Gauge.id}, Class: ${
              classObject.fullName
            }`}
            subtitleStyle={{color: classObject.colors[0]}}
            actAsExpander={false}
            showExpandableButton={false}
          />
          <div>
            <RaisedButton
              label="Toggle Metrics"
              backgroundColor={Colors.gold}
              labelColor={Colors.white}
              disabled={false}
              style={{marginTop: '10px', marginRight: '10px'}}
              icon={<Setting />}
              labelStyle={{fontSize: '12px'}}
              onClick={() => this.props.toggleMetricGaugeDrawer(true)}
            />
          </div>
        </div>
        <Divider />

        <Paper
          style={{
            width: '90%',
            overflow: 'hidden',
            margin: '30px auto',
            position: 'relative',
          }}
        >
          {this._renderAnnualPlot()}
        </Paper>

        <Slider
          min={this.props.annualFlowData.Years.year[0]}
          max={
            this.props.annualFlowData.Years.year[
              this.props.annualFlowData.Years.year.length - 1
            ]
          }
          sliderStyle={{marginBottom: '10px'}}
          step={1}
          style={{width: '600px', margin: '0px auto'}}
          value={this.state.currentYear}
          onChange={(e, v) => this._handleSlider(e, v)}
        />
        {this._renderSliderHelper()}
      </Card>
    );
  }
}

MetricGaugeCard.propTypes = {
  annualFlowData: PropTypes.object,
  fetchAnnualFlowData: PropTypes.func,
  toggleMetricGaugeDrawer: PropTypes.func,
};

const styles = {
  yLabel: {
    position: 'absolute',
    fontSize: '16px',
    left: '10px',
    top: '140px',
    color: '#616161',
    writingMode: 'vertical-rl',
    transform: 'rotate(-180deg)',
  },
  xLabel: {
    width: '100%',
    paddingTop: '20px',
    margin: '0px 0px 0px 230px',
  },
};
export default MetricGaugeCard;
