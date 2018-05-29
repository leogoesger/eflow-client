import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  fetchAnnualFlowData,
  fetchHydrographOverlay,
  getYaxisMax,
} from '../actions/metricDetail';

import {searchGauge} from '../actions/gauge';
import Layout from '../components/shared/searchBar/Layout';

class SearchBar extends React.Component {
  render() {
    return (
      <Layout
        searchedGauges={this.props.searchedGauges}
        searchGauge={d => this.props.searchGauge(d)}
        fetchHydrographOverlay={d => this.props.fetchHydrographOverlay(d)}
        fetchAnnualFlowData={d => this.props.fetchAnnualFlowData(d)}
        fixedYaxisPercentile={this.props.fixedYaxisPercentile}
        getYaxisMax={(id, percentile) => this.props.getYaxisMax(id, percentile)}
      />
    );
  }
}

SearchBar.propTypes = {
  searchedGauges: PropTypes.array,
  searchGauge: PropTypes.func,
  fetchHydrographOverlay: PropTypes.func,
  fetchAnnualFlowData: PropTypes.func,
  getYaxisMax: PropTypes.func,
  fixedYaxisPercentile: PropTypes.number,
};

const mapStateToProps = state => {
  return {
    searchedGauges: state.gauge.searchedGauges,
    fixedYaxisPercentile: state.metricDetail.fixedYaxis,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchGauge: d => dispatch(searchGauge(d)),
    fetchAnnualFlowData: d => dispatch(fetchAnnualFlowData(d)),
    fetchHydrographOverlay: d => dispatch(fetchHydrographOverlay(d)),
    getYaxisMax: (id, percentile) => dispatch(getYaxisMax(id, percentile)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
