import React from 'react';
import PropTypes from 'prop-types';

import Map from './Map';
import HydroTabs from './HydroCard/HydroTabs';
import GeneralTabs from './GeneralInfo/GeneralTabs';

export default class Layout extends React.Component {
  _renderGeneralInfo() {
    if (this.props.showGeneralInfo) {
      return <GeneralTabs />;
    }
    return (
      <HydroTabs
        tabValue={this.props.tabValue}
        updateTab={tabValue => this.props.updateTab(tabValue)}
        currentGauge={this.props.currentGauge}
        currentClassification={this.props.currentClassification}
      />
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
          fetchClassification={classId =>
            this.props.fetchClassification(classId)
          }
          fetchCurrentGauge={gaugeId => this.props.fetchCurrentGauge(gaugeId)}
          toggleGeneral={condition => this.props.toggleGeneral(condition)}
        />
        <div
          className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
          style={{zIndex: '2'}}
        >
          {this._renderGeneralInfo()}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  tabValue: PropTypes.string,
  updateTab: PropTypes.func,
  showGeneralInfo: PropTypes.bool,
  gauges: PropTypes.array,
  currentGauge: PropTypes.object,
  currentClassification: PropTypes.object,
  fetchCurrentGauge: PropTypes.func,
  fetchClassification: PropTypes.func,
  toggleGeneral: PropTypes.func,
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
