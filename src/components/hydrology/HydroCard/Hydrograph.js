import React from 'react';
import PropTypes from 'prop-types';
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
    };
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

  _renderPercentilleChips() {
    return (
      <div style={styles.labels}>
        <div style={{...styles.label, backgroundColor: Colors.nintyPercent}} />
        <div style={{fontSize: '14px'}}>{'90 Percentille'}</div>
        <div
          style={{...styles.label, backgroundColor: Colors.seventyFivePercent}}
        />

        <div style={{fontSize: '14px'}}>{'75 Percentille'}</div>
        <div style={{...styles.label, backgroundColor: Colors.fiftyPercent}} />

        <div style={{fontSize: '14px'}}>{'50 Percentille'}</div>
        <div
          style={{...styles.label, backgroundColor: Colors.seventyFivePercent}}
        />

        <div style={{fontSize: '14px'}}>{'25 Percentille'}</div>
        <div style={{...styles.label, backgroundColor: Colors.nintyPercent}} />

        <div style={{fontSize: '14px'}}>{'10 Percentille'}</div>
      </div>
    );
  }

  _renderData(hydroData) {
    if (hydroData) {
      return (
        <div>
          {this._renderInfo()}

          <div style={styles.plotTitle}>
            {'Dimensionless Reference Hydrograph'}
          </div>
          <div style={styles.yLabel}>{'Daily flow / Average annual Flow'} </div>
          <LinePlot
            x={this.props.containerWidth / 10}
            y={50}
            width={this.props.containerWidth}
            height={300}
            data={this.state.hydroData}
            xValue={value => value.date}
            yValue={value => value.flow}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <Paper style={styles.graph}>
        {this._renderData(this.state.hydroData)}
        {this._renderPercentilleChips()}
        <Control
          currentGauge={this.props.currentGauge}
          currentClassification={this.props.currentClassification}
          removeClassGaugeProps={() => this.props.removeClassGaugeProps()}
          fetchFallData={data => this.props.fetchFallData(data)}
          removeFallData={data => this.props.removeFallData(data)}
          fetchSpringData={data => this.props.fetchSpringData(data)}
          removeSpringData={data => this.props.removeSpringData(data)}
          fetchSummerData={data => this.props.fetchSummerData(data)}
          removeSummerData={data => this.props.removeSummerData(data)}
          fallData={this.props.fallData}
          springData={this.props.springData}
          summerData={this.props.summerData}
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
  fetchFallData: PropTypes.func,
  removeFallData: PropTypes.func,
  fetchSpringData: PropTypes.func,
  removeSpringData: PropTypes.func,
  fetchSummerData: PropTypes.func,
  removeSummerData: PropTypes.func,
  fallData: PropTypes.array,
  springData: PropTypes.array,
  summerData: PropTypes.array,
};

const styles = {
  yLabel: {
    position: 'absolute',
    fontSize: '14px',
    left: '20px',
    top: '200px',
    writingMode: 'vertical-rl',
    transform: 'rotate(-180deg)',
  },
  labels: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-around',
    position: 'absolute',
    left: '50px',
  },
  label: {
    height: '10px',
    width: '10px',
    marginTop: '1px',
  },
  graph: {
    height: '750px',
    width: '100%',
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
};

export default Hydrograph;
