import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import {
  Slider,
  Paper,
  RaisedButton,
  Card,
  CardHeader,
  Divider,
  IconMenu,
  FlatButton,
  MenuItem,
} from 'material-ui';
import Setting from 'material-ui/svg-icons/action/settings';
import { SimpleLinePlot } from '../../shared/plots';
import MetricGaugeDrawer from '../../metricDetail/MetricGaugeDrawer';
import { Colors } from '../../../styles';
import ErrorBoundary from '../../shared/ErrorBoundary';
import { removeNaN, saveAsImage } from '../../../utils/helpers';

import FileDownload from 'material-ui/svg-icons/file/file-download';

class MetricCard extends React.Component {
  constructor(props) {
    super(props);
    this.saveImageRef;
    this.state = {
      currentYear: this.props.data.yearRanges[0],
      zoomTransform: null,
      isDrawerOpen: false,
      logScale: false,
      isHydrographOverlay: false,
      fixedYaxis: 0,
      toggledMetrics: [],
      yMax: 475,
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

  zoomed() {
    this.setState({
      zoomTransform: d3.event.transform,
    });
  }

  _toggleDrawer() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  }

  async _handleSlider(e, v) {
    await this.setState({ currentYear: v });
  }

  _getdata(annualFlowData) {
    const filteredData = annualFlowData.filter(d => d !== null);

    const flowObjects = filteredData.map((d, i) => {
      if (Number(d) >= 0) {
        return { date: i, flow: Number(d) };
      } else return { date: i, flow: 0 };
    });
    return flowObjects;
  }

  handleToggleLogScale(bool) {
    this.setState({ logScale: bool });
  }

  handleHydrographOverlay(bool) {
    this.setState({ isHydrographOverlay: bool });
  }

  handleFixedYaxis(percentile) {
    this.setState({ fixedYaxis: percentile });
  }

  getYaxisMax(_, percentile) {
    let flowDataPOR = [];
    this.props.data.flowMatrix.forEach(flow => {
      flowDataPOR = flowDataPOR.concat(flow);
    });
    this.setState({
      yMax: d3.quantile(removeNaN(flowDataPOR), percentile),
    });
  }

  toggleAnnualFlowMetrics(metrics) {
    this.setState({ toggledMetrics: metrics });
  }

  _renderSliderHelper() {
    const year = this.props.data.yearRanges;
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
        <div>{Number(year[year.length - 1])}</div>
      </div>
    );
  }

  populateAnnualFlowData(flowMatrix) {
    const yearIndx = this.props.data.yearRanges.findIndex(
      year => year === this.state.currentYear
    );
    const annualFlowData = [];

    flowMatrix.map(d => {
      annualFlowData.push(d[yearIndx]);
    });
    return annualFlowData;
  }

  populateAnnualMetricsData() {
    const yearIndx = this.props.data.yearRanges.findIndex(
      year => year === this.state.currentYear
    );
    const annualMetricsData = {
      Springs: {},
      Falls: {},
      Summers: {},
      FallWinters: {},
      Winters: {},
    };

    Object.keys(metricsRef).forEach(metric => {
      const metrics = {};
      Object.keys(metricsRef[metric])
        .filter(k => k !== 'tableName')
        .forEach(key => {
          if (Object.keys(metricsRef[metric][key]).indexOf('two') === -1) {
            metrics[metricsRef[metric][key]] = this.props.data[metric][key][
              yearIndx
            ];
          } else {
            Object.keys(metricsRef[metric][key]).forEach(subKey => {
              metrics[metricsRef[metric][key][subKey]] = this.props.data[
                metric
              ][key][subKey][yearIndx];
            });
          }
        });
      annualMetricsData[metricsRef[metric]['tableName']] = { ...metrics };
    });

    return annualMetricsData;
  }

  _renderAnnualPlot() {
    if (!this.props.data.flowMatrix) {
      return (
        <div style={{ height: '399px', margin: '0 auto' }}>
          <p style={{ paddingTop: '200px', paddingLeft: '185px' }}>
            {':( Sorry, could not get annual flow data for this gauge!'}
          </p>
        </div>
      );
    }
    const { flowMatrix } = this.props.data;
    const annualFlowData = this.populateAnnualFlowData(flowMatrix);

    const filteredData = annualFlowData.filter(d => d === null);

    if (filteredData.length > 200) {
      return (
        <div style={{ height: '429px', margin: '0 auto' }}>
          <p style={{ paddingTop: '160px', paddingLeft: '220px' }}>
            {':( Sorry, too many NaN for the plot! Slide forward or backword'}
          </p>
        </div>
      );
    }

    return (
      <ErrorBoundary>
        <React.Fragment>
          <div style={styles.yLabel}>{'Flow Value (cfs)'}</div>
          <div style={styles.xLabel}>{`Water year hydrograph for ${
            this.state.currentYear
          }`}</div>
          {/* {this._renderYearStatus(this.props.data.condition)} */}
          <div style={{ marginLeft: '20px' }}>
            <svg
              width={700}
              height={380}
              ref={el => (this.svg = el)}
              style={{ cursor: 'pointer' }}
            >
              <SimpleLinePlot
                x={70}
                y={20}
                width={650}
                height={325}
                data={this._getdata(annualFlowData)}
                xValue={val => Number(val.date)}
                yValue={val => Number(val.flow)}
                color={Colors.blue}
                zoomTransform={this.state.zoomTransform}
                zoomType="detail"
                logScale={this.state.logScale}
                isHydrographOverlay={this.state.isHydrographOverlay}
                hydrograph={this.props.data.hydrograph}
                toggledMetrics={this.state.toggledMetrics}
                annualFlowData={this.populateAnnualMetricsData()}
                yMax={this.state.yMax}
                fixedYaxisPercentile={Number(this.state.fixedYaxis)}
              />
            </svg>
          </div>
        </React.Fragment>
      </ErrorBoundary>
    );
  }

  handleSaveAsImageBtn() {
    let fileName = `${this.props.data.name}_Year_${
      this.state.currentYear
    }_Flow_Plot.jpeg`;

    saveAsImage(this.saveImageRef, { fileName });
  }

  render() {
    if (!this.props.data) {
      return null;
    }
    return (
      <div
        ref={ref => {
          this.saveImageRef = ref;
        }}
      >
        <Card style={styles.container}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <CardHeader
              style={{ padding: '20px', margin: 'auto', fontWeight: 'bold' }}
              title="Annual Flow Plot"
              textStyle={{ paddingRight: '0px' }}
              actAsExpander={false}
              showExpandableButton={false}
            />
          </div>
          <Divider />
          <div
            style={{
              float: 'right',
              display: 'flex',
              justifyContent: 'space-between',
              position: 'absolute',
              zIndex: 1,
              top: '57px',
              width: 'auto',
              left: '531px',
            }}
          >
            <IconMenu
              iconButtonElement={
                <FlatButton
                  className="tour-metricDetail-download"
                  label="Download"
                  style={{ marginTop: '10px' }}
                  labelStyle={{ fontSize: '12px', color: Colors.gold }}
                  icon={<FileDownload color={Colors.gold} />}
                />
              }
            >
              <MenuItem
                primaryText="Plot As Image"
                onClick={() => this.handleSaveAsImageBtn()}
              />
            </IconMenu>
            <RaisedButton
              className="tour-metricDetail-display"
              label="Display"
              backgroundColor={Colors.gold}
              labelColor={Colors.white}
              disabled={false}
              style={{ margin: '10px 10px 14px 10px' }}
              icon={<Setting />}
              labelStyle={{ fontSize: '12px' }}
              onClick={() => this._toggleDrawer(true)}
            />
          </div>

          <Paper
            style={{
              width: 'auto',
              overflow: 'hidden',
              margin: 'auto',
              position: 'relative',
            }}
          >
            {this._renderAnnualPlot()}
          </Paper>

          <Slider
            className="tour-metricDetail-slider"
            min={this.props.data.yearRanges[0]}
            max={
              this.props.data.yearRanges[
                this.props.data.yearRanges.length - 1
              ] || this.props.data.Years.year[0] + 5
            }
            sliderStyle={{ marginBottom: '10px' }}
            step={1}
            style={{ width: '600px', margin: '0 auto' }}
            value={this.state.currentYear}
            onChange={(e, v) => this._handleSlider(e, v)}
          />
          {this._renderSliderHelper()}
          <MetricGaugeDrawer
            isDrawerOpen={this.state.isDrawerOpen}
            toggleMetricGaugeDrawer={bool => this._toggleDrawer(bool)}
            toggledMetrics={this.state.toggledMetrics}
            logScale={this.state.logScale}
            toggleAnnualFlowMetrics={metrics =>
              this.toggleAnnualFlowMetrics(metrics)
            }
            handleToggleLogScale={bool => this.handleToggleLogScale(bool)}
            handleHydrographOverlay={bool => this.handleHydrographOverlay(bool)}
            handleFixedYaxis={percentile => this.handleFixedYaxis(percentile)}
            isHydrographOverlay={this.state.isHydrographOverlay}
            fixedYaxis={Number(this.state.fixedYaxis)}
            currentGaugeId={null}
            getYaxisMax={(gaugeId, percentile) =>
              this.getYaxisMax(gaugeId, percentile)
            }
          />
        </Card>
      </div>
    );
  }
}

MetricCard.propTypes = {
  data: PropTypes.object,
};

const styles = {
  container: {
    // width: "80%",
    height: '570px',
    overflow: 'auto',
    // margin: "0 auto",
  },
  title: {
    marginTop: '10px',
    width: '100%',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: '16px',
    padding: '20px',
  },
  yLabel: {
    position: 'absolute',
    fontSize: '16px',
    left: '20px',
    top: '140px',
    color: '#616161',
    writingMode: 'vertical-rl',
    transform: 'rotate(-180deg)',
  },
  xLabel: {
    width: '100%',
    paddingTop: '20px',
    margin: '5px 0px 5px 275px',
  },
};

const metricsRef = {
  spring: {
    tableName: 'Springs',
    rocs: 'rateOfChange',
    timings: 'timing',
    durations: 'duration',
    magnitudes: 'magnitude',
  },

  summer: {
    tableName: 'Summers',
    durations_wet: 'durationWet',
    durations_flush: 'durationFlush',
    timings: 'timing',
    magnitudes_ten: 'magnitude10',
    magnitudes_fifty: 'magnitude50',
    no_flow_counts: 'noFlowCount',
  },

  fall: {
    tableName: 'Falls',
    timings: 'timing',
    wet_timings: 'timingWet',
    durations: 'duration',
    magnitudes: 'magnitude',
  },

  fallWinter: {
    tableName: 'FallWinters',
    baseflows: 'magWet',
  },

  winter: {
    tableName: 'Winters',
    magnitudes: {
      two: 'magnitude2',
      ten: 'magnitude10',
      five: 'magnitude5',
      twenty: 'magnitude20',
    },
  },
};

export default MetricCard;
