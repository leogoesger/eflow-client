import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import {CardHeader} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Reply from 'material-ui/svg-icons/content/reply';

import {LinePlot} from '../../shared/plots';
import {classification} from '../../../constants/classification';
import {Colors} from '../../../styles';

class Hydrograph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hydroData: null,
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
    return (
      <div>
        <CardHeader
          title={this.props.currentGauge.stationName}
          subtitle={`ID: ${this.props.currentGauge.id}, Class: ${
            classification[this.props.currentGauge.classId]
          }`}
          actAsExpander={false}
          showExpandableButton={false}
        />
        <Divider />
      </div>
    );
  }

  _renderClassInfo() {
    return (
      <div>
        <CardHeader
          title={this.props.currentClassification.name}
          subtitle={`ID: ${this.props.currentClassification.id}`}
          actAsExpander={false}
          showExpandableButton={false}
        />
        <Divider />
      </div>
    );
  }

  _getHydroData(nextProps) {
    let hydroData = [];
    if (nextProps.currentGauge) {
      nextProps.currentGauge.hydrographs[0].data.forEach((ele, index) =>
        hydroData.push({date: index + 1, flow: ele})
      );
    } else {
      nextProps.currentClassification.hydrographs[2].data.forEach(
        (ele, index) => hydroData.push({date: index + 1, flow: ele})
      );
    }
    this.setState({hydroData: hydroData});
  }

  _renderData(hydroData) {
    if (hydroData) {
      return (
        <div>
          {this._renderInfo()}

          <div style={styles.plotTitle}>
            {'Dimensionless Reference Hydrograph'}
          </div>
          <LinePlot
            x={this.props.containerWidth / 10}
            y={20}
            width={this.props.containerWidth}
            height={450}
            data={this.state.hydroData}
            xValue={value => value.date}
            yValue={value => value.flow}
          />
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
              labelStyle={{fontSize: '12px'}}
            />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <Paper style={styles.graph}>
        {this._renderData(this.state.hydroData)}
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
};

const styles = {
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
    fontSize: '18px',
  },
  btnContainer: {
    width: '95%',
    marginTop: '25px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

export default Hydrograph;
