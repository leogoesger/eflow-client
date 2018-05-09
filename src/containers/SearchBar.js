import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  fetchAnnualFlowData,
  fetchHydrographOverlay,
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
      />
    );
  }
}

SearchBar.propTypes = {
  searchedGauges: PropTypes.array,
  searchGauge: PropTypes.func,
  fetchHydrographOverlay: PropTypes.func,
  fetchAnnualFlowData: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    searchedGauges: state.gauge.searchedGauges,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchGauge: d => dispatch(searchGauge(d)),
    fetchAnnualFlowData: d => dispatch(fetchAnnualFlowData(d)),
    fetchHydrographOverlay: d => dispatch(fetchHydrographOverlay(d)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
