import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {CardHeader} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Reply from 'material-ui/svg-icons/content/reply';

import {classInfo} from '../../../constants/classification';
import {Colors} from '../../../styles';
import Summary from './Summary';
import ClassGaugeList from './ClassGaugeList';

class HydroInfo extends React.Component {
  _renderInfo() {
    if (this.props.currentGauge) {
      return this._renderGaugeInfo();
    } else if (this.props.currentClassification) {
      return this._renderClassInfo();
    } else {
      return (
        <ClassGaugeList
          classifications={this.props.classifications}
          updateHoveredGauge={gaugeId => this.props.updateHoveredGauge(gaugeId)}
          fetchCurrentGauge={gaugeId => this.props.fetchCurrentGauge(gaugeId)}
          fetchClassification={classId =>
            this.props.fetchClassification(classId)
          }
        />
      );
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

        <Summary summaryData={this.props.summaryData} />
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

        <Summary summaryData={this.props.summaryData} />
      </div>
    );
  }

  _renderButtons() {
    if (this.props.currentGauge || this.props.currentClassification) {
      return (
        <div style={styles.btnContainer}>
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
      );
    }
    return (
      <div style={styles.btnContainer}>
        <RaisedButton
          label="Details"
          backgroundColor={Colors.gold}
          labelColor={Colors.white}
          disabled={true}
          labelStyle={{fontSize: '12px', cursor: 'not-allowed'}}
        />
      </div>
    );
  }

  render() {
    return (
      <Paper style={styles.graph}>
        {this._renderInfo()}
        {this._renderButtons()}
      </Paper>
    );
  }
}

const styles = {
  graph: {
    height: '750px',
    width: '650px',
    marginBottom: '20px',
    borderRadius: '0px',
  },
  btnContainer: {
    width: '95%',
    marginTop: '25px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

HydroInfo.propTypes = {
  currentGauge: PropTypes.object,
  currentClassification: PropTypes.object,
  summaryData: PropTypes.object,
  removeClassGaugeProps: PropTypes.func,
  classifications: PropTypes.array,
  updateHoveredGauge: PropTypes.func,
  fetchCurrentGauge: PropTypes.func,
  fetchClassification: PropTypes.func,
};

export default HydroInfo;
