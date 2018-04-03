import React from 'react';
import PropTypes from 'prop-types';
import {CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Reply from 'material-ui/svg-icons/content/reply';

import {Colors} from '../../../styles';

export default class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fallFlushTiming: false,
      fallWetTiming: false,
      springTiming: false,
      summerTiming: false,
    };
  }

  _toggleCheckBox(boxName) {
    this.setState({[boxName]: !this.state[boxName]});
    const currentType = this.props.currentGauge
      ? {type: 'gaugeId', id: this.props.currentGauge.id}
      : {type: 'classId', id: this.props.currentClassification.id};

    if (!this.state[boxName]) {
      switch (boxName) {
        case 'fallFlushTiming':
          return this.props.fetchFallData({
            fallData: this.props.fallData,
            fetchData: {
              [currentType.type]: currentType.id,
              metric: 'timing',
            },
            id: boxName,
          });
        case 'fallWetTiming':
          return this.props.fetchFallData({
            fallData: this.props.fallData,
            fetchData: {
              [currentType.type]: currentType.id,
              metric: 'timingWet',
            },
            id: boxName,
          });
        case 'springTiming':
          return this.props.fetchSpringData({
            springData: this.props.springData,
            fetchData: {
              [currentType.type]: currentType.id,
              metric: 'timing',
            },
            id: boxName,
          });
        case 'summerTiming':
          return this.props.fetchSummerData({
            summerData: this.props.summerData,
            fetchData: {
              [currentType.type]: currentType.id,
              metric: 'timing',
            },
            id: boxName,
          });
        default:
          return null;
      }
    } else {
      switch (boxName) {
        case 'fallFlushTiming':
          return this.props.removeFallData({
            id: boxName,
            fallData: this.props.fallData,
          });
        case 'fallWetTiming':
          return this.props.removeFallData({
            id: boxName,
            fallData: this.props.fallData,
          });
        case 'springTiming':
          return this.props.removeSpringData({
            id: boxName,
            springData: this.props.springData,
          });
        case 'summerTiming':
          return this.props.removeSummerData({
            id: boxName,
            summerData: this.props.summerData,
          });
        default:
          return null;
      }
    }
  }

  render() {
    return (
      <div style={styles.btnContainer}>
        <div style={styles.checkBoxContainer}>
          <CardHeader
            title="BoxPlot Overlay"
            style={{padding: '10px 0px', width: '200px'}}
            titleStyle={{width: '200px', color: Colors.blue}}
          />

          <Checkbox
            checked={this.state.fallFlushTiming}
            label="Fall Flush Timing"
            style={styles.checkbox}
            labelStyle={styles.labelStyle}
            iconStyle={{width: '16px', fill: Colors.gold}}
            onClick={() => this._toggleCheckBox('fallFlushTiming')}
          />
          <Checkbox
            checked={this.state.fallWetTiming}
            label="Fall Timing Wet"
            style={styles.checkbox}
            labelStyle={styles.labelStyle}
            iconStyle={{width: '16px', fill: Colors.gold}}
            onClick={() => this._toggleCheckBox('fallWetTiming')}
          />
          <Checkbox
            checked={this.state.springTiming}
            label="Spring Timing"
            style={styles.checkbox}
            labelStyle={styles.labelStyle}
            iconStyle={{width: '16px', fill: Colors.gold}}
            onClick={() => this._toggleCheckBox('springTiming')}
          />
          <Checkbox
            checked={this.state.summerTiming}
            label="Summer Timing"
            style={styles.checkbox}
            labelStyle={styles.labelStyle}
            iconStyle={{width: '16px', fill: Colors.gold}}
            onClick={() => this._toggleCheckBox('summerTiming')}
          />
        </div>
        <div style={styles.rightBtn}>
          <FlatButton
            label="Go Back"
            style={{marginRight: '20px'}}
            labelStyle={{fontSize: '12px', color: Colors.gold}}
            icon={<Reply color={Colors.gold} />}
            onClick={() => this.props.removeClassGaugeProps()}
          />
          <RaisedButton
            label="Details"
            backgroundColor={Colors.gold}
            labelColor={Colors.white}
            disabled={true}
            labelStyle={{fontSize: '12px', cursor: 'not-allowed'}}
          />
        </div>
      </div>
    );
  }
}

Control.propTypes = {
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
  btnContainer: {
    margin: '55px auto',
    width: '95%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  rightBtn: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  checkBoxContainer: {
    width: '30%',
    marginLeft: '20px',
  },
  labelStyle: {
    color: Colors.offBlack,
    fontSize: '12px',
  },
};
