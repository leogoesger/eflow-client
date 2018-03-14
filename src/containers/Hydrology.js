import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchClassification} from '../actions/classification';
import {fetchGauges, fetchCurrentGauge} from '../actions/gauge';
import {updateTab, toggleGeneral} from '../actions/shared';
import Layout from '../components/hydrology/Layout';

export class Hydrology extends React.Component {
  componentWillMount() {
    this.props.fetchGauges();
  }

  render() {
    return (
      <Layout
        gauges={this.props.gauges}
        tabValue={this.props.tabValue}
        showGeneralInfo={this.props.showGeneralInfo}
        currentGauge={this.props.currentGauge}
        fetchCurrentGauge={gaugeId => this.props.fetchCurrentGauge(gaugeId)}
        currentClassification={this.props.currentClassification}
        fetchClassification={classId => this.props.fetchClassification(classId)}
        updateTab={tabValue => this.props.updateTab(tabValue)}
        toggleGeneral={condition => this.props.toggleGeneral(condition)}
      />
    );
  }
}

Hydrology.propTypes = {
  fetchClassification: PropTypes.func,
  fetchGauges: PropTypes.func,
  fetchCurrentGauge: PropTypes.func,
  gauges: PropTypes.array,
  tabValue: PropTypes.string,
  updateTab: PropTypes.func,
  showGeneralInfo: PropTypes.bool,
  currentGauge: PropTypes.object,
  currentClassification: PropTypes.object,
  toggleGeneral: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    tabValue: state.shared.tabValue,
    showGeneralInfo: state.shared.showGeneralInfo,
    gauges: state.gauge.gauges,
    currentGauge: state.gauge.currentGauge,
    currentClassification: state.classification.currentClassification,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchClassification: classId => dispatch(fetchClassification(classId)),
    fetchGauges: () => dispatch(fetchGauges()),
    fetchCurrentGauge: gaugeId => dispatch(fetchCurrentGauge(gaugeId)),
    updateTab: tabValue => dispatch(updateTab(tabValue)),
    toggleGeneral: condtion => dispatch(toggleGeneral(condtion)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hydrology);
