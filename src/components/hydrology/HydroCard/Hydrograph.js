import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { Paper, Divider, RaisedButton, FlatButton } from 'material-ui';
import { CardHeader } from 'material-ui/Card';
import Reply from 'material-ui/svg-icons/content/reply';
import TimeLine from 'material-ui/svg-icons/action/timeline';
import ViewDay from 'material-ui/svg-icons/action/view-day';
import Upload from 'material-ui/svg-icons/file/cloud-upload';
import Image from 'material-ui/svg-icons/image/image';
import { navigateTo, saveAsImage } from '../../../utils/helpers';
import { LinePlot } from '../../shared/plots';
import { classInfo } from '../../../constants/classification';

import { Colors } from '../../../styles';
import Control from './Control';

const colors = {
  NINTY: Colors.NINTY,
  SEVENTYFIVE: Colors.SEVENTYFIVE,
  FIFTY: Colors.FIFTY,
  TWENTYFIVE: Colors.TWENTYFIVE,
  TEN: Colors.TEN,
};

class Hydrograph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hydroData: null,
      fallFlushTiming: false,
      fallWetTiming: false,
      springTiming: false,
      summerTiming: false,
      zoomTransform: null,
      minMax: false,
    };
    this.zoom = d3
      .zoom()
      .scaleExtent([-10, 10])
      .translateExtent([[-100, -100], [700 + 100, 420 + 100]])
      .extent([[-100, -100], [700 + 100, 420 + 100]])
      .on('zoom', () => this.zoomed());
    this.saveImageRef;
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentGauge || nextProps.currentClassification) {
      this._setHydrographData(nextProps);
    }
  }

  _renderTitleInfo() {
    if (this.props.currentGauge) {
      return this._renderGaugeInfo();
    } else if (this.props.currentClassification) {
      return this._renderClassInfo();
    } else {
      return null;
    }
  }

  _renderGaugeInfo() {
    const currentGaugeClass =
      classInfo[`class${this.props.currentGauge.classId}`];
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <CardHeader
            title={this.props.currentGauge.stationName}
            subtitle={`ID: ${this.props.currentGauge.id}, Class: ${
              currentGaugeClass.fullName
            }`}
            subtitleColor={currentGaugeClass.colors[0]}
            actAsExpander={false}
            showExpandableButton={false}
            style={{ padding: '15px 0px 15px 10px' }}
          />
          <Control
            currentGauge={this.props.currentGauge}
            currentClassification={this.props.currentClassification}
            overLayBoxPlotMethods={this.props.overLayBoxPlotMethods}
            toggleMinMax={() => this.setState({ minMax: !this.state.minMax })}
            minMax={this.state.minMax}
          />
        </div>
        <Divider />
      </div>
    );
  }

  _renderClassInfo() {
    const currentClass =
      classInfo[`class${this.props.currentClassification.id}`];
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <CardHeader
            title={this.props.currentClassification.name}
            titleColor={currentClass.colors[0]}
            subtitle={`ID: ${this.props.currentClassification.id}`}
            actAsExpander={false}
            showExpandableButton={false}
            style={{ padding: '15px 0px 15px 10px' }}
          />
          <Control
            currentGauge={this.props.currentGauge}
            currentClassification={this.props.currentClassification}
            overLayBoxPlotMethods={this.props.overLayBoxPlotMethods}
            toggleMinMax={() => this.setState({ minMax: !this.state.minMax })}
            minMax={this.state.minMax}
          />
        </div>
        <Divider />
      </div>
    );
  }

  _setHydrographData(nextProps) {
    let hydroData = {
      TEN: [],
      TWENTYFIVE: [],
      FIFTY: [],
      SEVENTYFIVE: [],
      NINTY: [],
      MIN: [],
      MAX: [],
    };
    let hydrographs;
    hydrographs = nextProps.currentGauge
      ? nextProps.currentGauge.hydrographs
      : nextProps.currentClassification.hydrographs;

    hydrographs.forEach(hydrograph => {
      hydrograph.data.forEach((ele, index) => {
        hydroData[hydrograph.percentille].push({ date: index + 1, flow: ele });
      });
    });

    this.setState({ hydroData: hydroData });
  }

  _renderPercentilleChips() {
    return (
      <div style={styles.labels}>
        <div style={styles.labelName}>{'Percentiles:'}</div>

        <div style={{ ...styles.label, backgroundColor: Colors.NINTY }} />
        <div style={styles.labelName}>{'10th'}</div>

        <div style={{ ...styles.label, backgroundColor: Colors.SEVENTYFIVE }} />
        <div style={styles.labelName}>{'25th'}</div>

        <div style={{ ...styles.label, backgroundColor: Colors.FIFTY }} />
        <div style={styles.labelName}>{'50th'}</div>

        <div style={{ ...styles.label, backgroundColor: Colors.TWENTYFIVE }} />
        <div style={styles.labelName}>{'75th'}</div>

        <div style={{ ...styles.label, backgroundColor: Colors.TEN }} />
        <div style={styles.labelName}>{'90th'}</div>

        {this.state.minMax ? (
          <React.Fragment>
            <div style={{ ...styles.label, backgroundColor: Colors.MIN }} />
            <div style={styles.labelName}>{'min/max'}</div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }

  _renderDRHs(hydroData) {
    let yearRanges = '';
    if (this.props.currentGauge) {
      const years = this.props.currentGauge.years[0].allYears;
      yearRanges = `${years[0]}-${years[years.length - 1]}`;
    }

    if (this.state.minMax) {
      colors.MIN = Colors.MIN;
      colors.MAX = Colors.MAX;
    } else {
      colors.MIN = 'rgba(0, 0, 0, 0)';
      colors.MAX = 'rgba(0, 0, 0, 0)';
    }

    if (hydroData) {
      return (
        <div>
          {this._renderTitleInfo()}
          <div style={styles.plotTitle}>
            {`Dimensionless Reference Hydrograph ${yearRanges}`}
          </div>
          <div style={styles.yLabel}>{'Daily flow / Average annual Flow'} </div>
          <svg
            width={620}
            height={400}
            ref={el => (this.svg = el)}
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          >
            <LinePlot
              x={this.props.containerWidth / 10}
              y={25}
              width={550}
              height={300}
              data={this.state.hydroData}
              xValue={value => value.date}
              yValue={value => value.flow}
              highestKey={'NINTY'}
              colors={colors}
              overLayBoxPlotData={this.props.overLayBoxPlotData}
              verticalOverlayBoxPlotData={this.props.verticalOverlayBoxPlotData}
              zoomTransform={this.state.zoomTransform}
              zoomType="detail"
            />
          </svg>
        </div>
      );
    }
  }
  handleSaveAsImageBtn() {
    let fileName = this.props.currentClassification
      ? `Class_${this.props.currentClassification.id}`
      : `Gauge_${this.props.currentGauge.id}`;

    fileName += `_Hydrograph.jpeg`;
    saveAsImage(this.saveImageRef, {
      fileName,
      height: 520,
    });
  }

  render() {
    const { currentGauge, removeClassGaugeProps } = this.props;
    return (
      <div
        ref={ref => {
          this.saveImageRef = ref;
        }}
      >
        <Paper style={styles.graph} className="tour-hydro-general-display">
          {this._renderDRHs(this.state.hydroData)}
          {this._renderPercentilleChips()}

          <div style={styles.btnContainer}>
            <FlatButton
              label="Upload Data"
              labelStyle={{ fontSize: '12px', color: Colors.gold }}
              icon={<Upload color={Colors.gold} />}
              onClick={() => navigateTo('/profile')}
            />
            <FlatButton
              label="Save As Image"
              labelStyle={{ fontSize: '12px', color: Colors.gold }}
              icon={<Image color={Colors.gold} />}
              onClick={() => this.handleSaveAsImageBtn()}
            />
            <FlatButton
              label="Gauge List"
              labelStyle={{ fontSize: '12px', color: Colors.gold }}
              icon={<Reply color={Colors.gold} />}
              onClick={() => removeClassGaugeProps()}
            />
            <RaisedButton
              className="tour-hydro-metricDetail"
              label={currentGauge ? 'Annual Flow Plot' : 'Class Box plot'}
              backgroundColor={Colors.gold}
              labelColor={Colors.white}
              disabled={false}
              icon={currentGauge ? <TimeLine /> : <ViewDay />}
              labelStyle={{ fontSize: '12px' }}
              onClick={() => navigateTo('/metricDetail')}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

Hydrograph.propTypes = {
  containerWidth: PropTypes.number,
  summaryData: PropTypes.object,
  currentGauge: PropTypes.object,
  currentClassification: PropTypes.object,
  removeClassGaugeProps: PropTypes.func,
  overLayBoxPlotMethods: PropTypes.object,
  overLayBoxPlotData: PropTypes.array,
  verticalOverlayBoxPlotData: PropTypes.array,
};

const styles = {
  yLabel: {
    position: 'absolute',
    fontSize: '14px',
    left: '18px',
    top: '180px',
    writingMode: 'vertical-rl',
    transform: 'rotate(-180deg)',
  },
  labels: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-around',
    position: 'absolute',
    top: '480px',
    left: '40px',
  },
  label: {
    height: '10px',
    width: '10px',
    marginTop: '0px',
  },
  graph: {
    height: '750px',
    width: '650px',
    marginBottom: '20px',
    borderRadius: '0px',
  },
  plotTitle: {
    marginTop: '40px',
    width: '100%',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: '16px',
  },
  labelName: { fontSize: '14px', marginLeft: '-35px', marginTop: '-2px' },
  minMax: {
    width: '180px',
    position: 'absolute',
    right: '0px',
    top: '20px',
  },
  labelStyle: {
    fontSize: '16px',
    color: '#757575',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '96%',
    margin: '30px auto',
  },
};

export default Hydrograph;
