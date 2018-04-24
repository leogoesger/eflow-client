import React from 'react';
import PropTypes from 'prop-types';
import {CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Reply from 'material-ui/svg-icons/content/reply';
import {find} from 'lodash';

import {navigateTo} from '../../../utils/helpers';
import {metricReference} from '../../../constants/metrics';
import {Colors} from '../../../styles';

export default class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    metricReference.forEach(metric => {
      if (metric.isBoxplotOverlay) {
        this.state[metric.name] = false; // eslint-disable-line
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.currentGauge != this.props.currentGauge ||
      nextProps.currentClassification != this.props.currentClassification
    ) {
      //Reset all boxplot data to null
      Object.keys(this.state).forEach(key => {
        const currentMetric = find(metricReference, m => m.name == key);
        this.props.overLayBoxPlotMethods[
          currentMetric.boxPlotOverLayMethods[1]
        ]({
          type: currentMetric.name,
        });
        this.setState({[key]: false});
      });
    }
  }

  _toggleCheckBox(metricObject) {
    this.setState({[metricObject.name]: !this.state[metricObject.name]});

    const currentType = this.props.currentGauge
      ? {type: 'gaugeId', id: this.props.currentGauge.id}
      : {type: 'classId', id: this.props.currentClassification.id};

    if (!this.state[metricObject.name]) {
      return this.props.overLayBoxPlotMethods[
        metricObject.boxPlotOverLayMethods[0]
      ]({
        fetchData: {
          [currentType.type]: currentType.id,
          metric: metricObject.columnName,
        },
        type: metricObject.name,
      });
    } else {
      return this.props.overLayBoxPlotMethods[
        metricObject.boxPlotOverLayMethods[1]
      ]({
        type: metricObject.name,
      });
    }
  }

  _renderCheckBox() {
    return metricReference.map(metricObject => {
      if (metricObject.isBoxplotOverlay) {
        return (
          <Checkbox
            key={metricObject.name}
            checked={this.state[metricObject.name]}
            label={metricObject.display}
            style={styles.checkbox}
            labelStyle={styles.labelStyle}
            iconStyle={{width: '16px', fill: metricObject.colors[0]}}
            onClick={() => this._toggleCheckBox(metricObject)}
          />
        );
      }
    });
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
          <div
            style={{
              width: '55%',
              height: '160px',
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
            }}
          >
            {this._renderCheckBox()}
          </div>
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
            disabled={false}
            labelStyle={{fontSize: '12px'}}
            onClick={() => navigateTo('/metricDetail')}
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
    margin: '50px auto',
    width: '95%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  rightBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '36px',
  },
  checkBoxContainer: {
    width: '60%',
    marginLeft: '20px',
  },
  labelStyle: {
    color: Colors.offBlack,
    fontSize: '12px',
  },
};
