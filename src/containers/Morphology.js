import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchGeoSites} from '../actions/geoSite';
import Layout from '../components/morphology/Layout';

export class Morphology extends React.Component {
  componentDidMount() {
    document.title = 'Eflows | Morphology';
    this.props.fetchGeoSites();
  }

  render() {
    return (
      <div>
        <div style={styles.banner} />
        <Layout geoSites={this.props.geoSites} />
      </div>
    );
  }
}

Morphology.propTypes = {
  fetchGeoSites: PropTypes.func,
  geoSites: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    geoSites: state.geoSite.geoSites,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGeoSites: () => dispatch(fetchGeoSites()),
  };
};

const styles = {
  banner: {
    backgroundColor: '#424242',
    height: '230px',
    zIndex: '0',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Morphology);
