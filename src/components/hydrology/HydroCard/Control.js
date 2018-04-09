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
      fallTiming: false,
      fallTimingWet: false,
      springTiming: false,
      summerTiming: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.currentGauge != this.props.currentGauge ||
      nextProps.currentClassification != this.props.currentClassification
    ) {
      this.setState({
        fallTiming: false,
        fallTimingWet: false,
        springTiming: false,
        summerTiming: false,
      });
      this.props.overLayBoxPlotMethods.removeFallBoxPlotData({
        type: 'fallTiming',
      });
      this.props.overLayBoxPlotMethods.removeFallBoxPlotData({
        type: 'fallTimingWet',
      });
      this.props.overLayBoxPlotMethods.removeSpringBoxPlotData({
        type: 'springTiming',
      });
      this.props.overLayBoxPlotMethods.removeSummerBoxPlotData({
        type: 'summerTiming',
      });
    }
  }

  _toggleCheckBox(boxName) {
    this.setState({[boxName]: !this.state[boxName]});
    const {
      fetchFallBoxPlotData,
      fetchSpringBoxPlotData,
      fetchSummerBoxPlotData,
      removeFallBoxPlotData,
      removeSpringBoxPlotData,
      removeSummerBoxPlotData,
    } = this.props.overLayBoxPlotMethods;

    const currentType = this.props.currentGauge
      ? {type: 'gaugeId', id: this.props.currentGauge.id}
      : {type: 'classId', id: this.props.currentClassification.id};

    if (!this.state[boxName]) {
      switch (boxName) {
        case 'fallTiming':
          return fetchFallBoxPlotData({
            fetchData: {
              [currentType.type]: currentType.id,
              metric: 'timing',
            },
            type: boxName,
          });
        case 'fallTimingWet':
          return fetchFallBoxPlotData({
            fetchData: {
              [currentType.type]: currentType.id,
              metric: 'timingWet',
            },
            type: boxName,
          });
        case 'springTiming':
          return fetchSpringBoxPlotData({
            fetchData: {
              [currentType.type]: currentType.id,
              metric: 'timing',
            },
            type: boxName,
          });
        case 'summerTiming':
          return fetchSummerBoxPlotData({
            fetchData: {
              [currentType.type]: currentType.id,
              metric: 'timing',
            },
            type: boxName,
          });
        default:
          return null;
      }
    } else {
      switch (boxName) {
        case 'fallTiming':
          return removeFallBoxPlotData({
            type: boxName,
          });
        case 'fallTimingWet':
          return removeFallBoxPlotData({
            type: boxName,
          });
        case 'springTiming':
          return removeSpringBoxPlotData({
            type: boxName,
          });
        case 'summerTiming':
          return removeSummerBoxPlotData({
            type: boxName,
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
            checked={this.state.fallTiming}
            label="Fall Flush Timing"
            style={styles.checkbox}
            labelStyle={styles.labelStyle}
            iconStyle={{width: '16px', fill: '#f9a825'}}
            onClick={() => this._toggleCheckBox('fallTiming')}
          />
          <Checkbox
            checked={this.state.fallTimingWet}
            label="Fall Timing Wet"
            style={styles.checkbox}
            labelStyle={styles.labelStyle}
            iconStyle={{width: '16px', fill: '#558b2f'}}
            onClick={() => this._toggleCheckBox('fallTimingWet')}
          />
          <Checkbox
            checked={this.state.springTiming}
            label="Spring Timing"
            style={styles.checkbox}
            labelStyle={styles.labelStyle}
            iconStyle={{width: '16px', fill: '#6a1b9a'}}
            onClick={() => this._toggleCheckBox('springTiming')}
          />
          <Checkbox
            checked={this.state.summerTiming}
            label="Summer Timing"
            style={styles.checkbox}
            labelStyle={styles.labelStyle}
            iconStyle={{width: '16px', fill: '#bf360c'}}
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
  overLayBoxPlotMethods: PropTypes.object,
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
