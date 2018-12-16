import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { searchGauge } from "../actions/gauge";
import Layout from "../components/shared/searchBar/Layout";

class SearchBar extends React.Component {
  _onRowHover(id) {
    if (this.props.onRowHover) {
      this.props.onRowHover(id);
    }
  }

  render() {
    return (
      <Layout
        searchedGauges={this.props.searchedGauges}
        searchGauge={d => this.props.searchGauge(d)}
        selectRowHandler={gauge => this.props.selectRowHandler(gauge)}
        onRowHover={id => this._onRowHover(id)}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    searchedGauges: state.gauge.searchedGauges,
    fixedYaxisPercentile: state.metricDetail.fixedYaxis,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchGauge: d => dispatch(searchGauge(d)),
  };
};

SearchBar.propTypes = {
  searchGauge: PropTypes.func,
  searchedGauges: PropTypes.array,
  selectRowHandler: PropTypes.func,
  onRowHover: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
