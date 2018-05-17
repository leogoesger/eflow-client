import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Paper from 'material-ui/Paper';
import {CardHeader} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import {LinePlot} from '../../shared/plots';
import {classInfo} from '../../../constants/classification';

import {Colors} from '../../../styles';
import Control from './Control';

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentGauge || nextProps.currentClassification) {
      this._getHydroData(nextProps);
    }
  }

  _renderInfo() {
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
        <CardHeader
          title={this.props.currentGauge.stationName}
          subtitle={`ID: ${this.props.currentGauge.id}, Class: ${
            currentGaugeClass.fullName
          }`}
          subtitleColor={currentGaugeClass.colors[0]}
          actAsExpander={false}
          showExpandableButton={false}
        />
        <Divider />
      </div>
    );
  }

  _renderClassInfo() {
    const currentClass =
      classInfo[`class${this.props.currentClassification.id}`];
    return (
      <div>
        <CardHeader
          title={this.props.currentClassification.name}
          titleColor={currentClass.colors[0]}
          subtitle={`ID: ${this.props.currentClassification.id}`}
          actAsExpander={false}
          showExpandableButton={false}
        />
        <Divider />
      </div>
    );
  }

  _getHydroData(nextProps) {
    let hydroData = {
      TEN: [],
      TWENTYFIVE: [],
      FIFTY: [],
      SEVENTYFIVE: [],
      NINTY: [],
    };
    if (nextProps.currentGauge) {
      nextProps.currentGauge.hydrographs.forEach(hydrograph => {
        hydrograph.data.forEach((ele, index) => {
          hydroData[hydrograph.percentille].push({date: index + 1, flow: ele});
        });
      });
    } else {
      nextProps.currentClassification.hydrographs.forEach(classification => {
        classification.data.forEach((ele, index) => {
          hydroData[classification.percentille].push({
            date: index + 1,
            flow: ele,
          });
        });
      });
    }
    this.setState({hydroData: hydroData});
  }

  _renderpercentilleChips() {
    return (
      <div style={styles.labels}>
        <div style={styles.labelName}>{'Percentiles:'}</div>
        <div style={{...styles.label, backgroundColor: Colors.NINTY}} />
        <div style={styles.labelName}>{'10th'}</div>
        <div style={{...styles.label, backgroundColor: Colors.SEVENTYFIVE}} />

        <div style={styles.labelName}>{'25th'}</div>
        <div style={{...styles.label, backgroundColor: Colors.FIFTY}} />

        <div style={styles.labelName}>{'50th'}</div>
        <div style={{...styles.label, backgroundColor: Colors.TWENTYFIVE}} />

        <div style={styles.labelName}>{'75th'}</div>
        <div style={{...styles.label, backgroundColor: Colors.TEN}} />

        <div style={styles.labelName}>{'90th'}</div>
      </div>
    );
  }

  _renderData(hydroData) {
    if (hydroData) {
      const colors = {
        NINTY: Colors.NINTY,
        SEVENTYFIVE: Colors.SEVENTYFIVE,
        FIFTY: Colors.FIFTY,
        TWENTYFIVE: Colors.TWENTYFIVE,
        TEN: Colors.TEN,
      };
      return (
        <div>
          {this._renderInfo()}

          <div style={styles.plotTitle}>
            {'Dimensionless Reference Hydrograph'}
          </div>
          <div style={styles.yLabel}>{'Daily flow / Average annual Flow'} </div>
          <svg
            width={620}
            height={400}
            ref={el => (this.svg = el)}
            style={{cursor: 'pointer', marginLeft: '10px'}}
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

  render() {
    return (
      <Paper style={styles.graph} className="tour-hydro-general-display">
        {this._renderData(this.state.hydroData)}
        {this._renderpercentilleChips()}
        <Control
          currentGauge={this.props.currentGauge}
          currentClassification={this.props.currentClassification}
          removeClassGaugeProps={() => this.props.removeClassGaugeProps()}
          overLayBoxPlotMethods={this.props.overLayBoxPlotMethods}
        />
      </Paper>
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
    top: '460px',
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
    marginTop: '20px',
    width: '100%',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: '16px',
  },
  labelName: {fontSize: '14px', marginLeft: '-35px', marginTop: '-2px'},
};

export default Hydrograph;
