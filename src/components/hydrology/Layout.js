import React from 'react';
import PropTypes from 'prop-types';

import Map from './Map';
import HydroTabs from './HydroTabs';

export default class Layout extends React.Component {
  _getCurrentGaugeObject(gauges, gaugeId) {
    if (gauges) {
      const currentGauge = gauges.filter(gauge => gauge.id === gaugeId);
      return currentGauge[0];
    } else {
      return null;
    }
  }

  _getCurrentClassObject(classes, classId) {
    if (classes) {
      if (Object.keys(classes).includes(`class${classId}`)) {
        return classes[`class${classId}`];
      }
    } else {
      return null;
    }
  }

  render() {
    const DRHdata = [
      {date: '1', flow: 180},
      {date: '2', flow: 250},
      {date: '3', flow: 150},
      {date: '4', flow: 696},
      {date: '5', flow: 140},
      {date: '6', flow: 200},
      {date: '7', flow: 100},
      {date: '8', flow: 0},
    ];

    const currentGaugeObject = this._getCurrentGaugeObject(
        this.props.gauges,
        this.props.currentGauge
      ),
      currentClassObject = this._getCurrentClassObject(
        this.props.classifications,
        this.props.currentClassification
      );

    return (
      <div
        className="col-lg-11 col-md-11 col-sm-11 col-xs-12"
        style={styles.container}
      >
        <div style={styles.banner} />
        <Map
          className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
          gauges={this.props.gauges}
          currentGauge={this.props.currentGauge}
          classifications={this.props.classifications}
          fetchClassification={classId =>
            this.props.fetchClassification(classId)
          }
          updateCurrentGauge={gaugeId => this.props.updateCurrentGauge(gaugeId)}
          updateCurrentClass={classId => this.props.updateCurrentClass(classId)}
        />
        <div
          className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
          style={{zIndex: '2'}}
        >
          <HydroTabs
            DRHdata={DRHdata}
            currentGauge={currentGaugeObject}
            currentClassification={currentClassObject}
          />
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  gauges: PropTypes.array,
  currentGauge: PropTypes.number,
  classifications: PropTypes.object,
  currentClassification: PropTypes.number,
  updateCurrentGauge: PropTypes.func,
  fetchClassification: PropTypes.func,
  updateCurrentClass: PropTypes.func,
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    margin: '150px auto',
    height: '100%',
  },
  banner: {
    backgroundColor: '#424242',
    position: 'absolute',
    top: '0px',
    left: '0px',
    right: '0px',
    height: '220px',
    zIndex: '0',
  },
};
