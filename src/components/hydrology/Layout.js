import React from 'react';
import PropTypes from 'prop-types';

import Map from './Map';
import HydroTabs from './HydroCard/HydroTabs';

export default class Layout extends React.Component {
  _updateHoverGauge(gaugeId) {
    this.props.updateHoveredGauge(
      this.props.gauges.find(gauge => gauge.id === gaugeId)
    );
  }

  render() {
    return (
      <div
        className="col-lg-11 col-md-11 col-sm-11 col-xs-12"
        style={styles.container}
      >
        <div style={styles.banner} />
        <Map
          className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
          gauges={this.props.gauges}
          hoveredGauge={this.props.hoveredGauge}
          fetchClassification={classId =>
            this.props.fetchClassification(classId)
          }
          fetchCurrentGauge={gaugeId => this.props.fetchCurrentGauge(gaugeId)}
        />
        <div
          className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
          style={{zIndex: '2'}}
        >
          <HydroTabs
            tabValue={this.props.tabValue}
            updateTab={tabValue => this.props.updateTab(tabValue)}
            currentGauge={this.props.currentGauge}
            currentClassification={this.props.currentClassification}
            removeClassGaugeProps={() => this.props.removeClassGaugeProps()}
            classifications={this.props.classifications}
            fetchCurrentGauge={gaugeId => this.props.fetchCurrentGauge(gaugeId)}
            fetchClassification={classId =>
              this.props.fetchClassification(classId)
            }
            updateHoveredGauge={gaugeId => this._updateHoverGauge(gaugeId)}
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
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  tabValue: PropTypes.string,
  hoveredGauge: PropTypes.object,
  updateTab: PropTypes.func,
  gauges: PropTypes.array,
  currentGauge: PropTypes.object,
  currentClassification: PropTypes.object,
  fetchCurrentGauge: PropTypes.func,
  fetchClassification: PropTypes.func,
  removeClassGaugeProps: PropTypes.func,
  classifications: PropTypes.array,
  updateHoveredGauge: PropTypes.func,
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
