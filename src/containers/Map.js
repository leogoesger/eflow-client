import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchGeoSites} from '../actions/geoSite';
import {
  defaultMapStyle,
  getSiteLayer,
} from '../components/morphology/MapStyle.js';
import BaseMap from '../components/map/BaseMap';
import {GeoMapHOC} from '../hoc/GeoMapHOC';
import MapControl from '../components/morphology/MapControl';
import MapLegend from '../components/morphology/MapLegend';

const MorphologyMap = GeoMapHOC(
  BaseMap,
  MapControl,
  MapLegend,
  defaultMapStyle,
  getSiteLayer
);

class Map extends React.Component {
  componentDidMount() {
    if (this.props.path === '/morphology') {
      this.props.fetchGeoSites();
    }
  }

  render() {
    if (this.props.path === '/morphology') {
      return <MorphologyMap geoSites={this.props.geoSites} />;
    }
  }
}

Map.propTypes = {
  fetchGeoSites: PropTypes.func,
  path: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(Map);
