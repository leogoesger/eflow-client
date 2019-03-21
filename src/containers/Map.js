import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchGeoSites } from '../actions/geoSite';
import { updateCurrentRegion } from '../actions/geoRegion';
import {
  defaultMapStyle,
  getSiteLayer,
  getSiteLayerLarge,
} from '../components/morphology/MapStyle.js';
import BaseMap from '../components/map/BaseMap';
import { GeoMapHOC } from '../hoc/GeoMapHOC';
import MapControl from '../components/morphology/MapControl';
import MapLegend from '../components/morphology/MapLegend';
import MapDialog from '../components/morphology/MapDialog';

const MorphologyMap = GeoMapHOC(
  BaseMap,
  MapControl,
  MapLegend,
  defaultMapStyle,
  getSiteLayer,
  getSiteLayerLarge,
  MapDialog
);

class Map extends React.Component {
  componentDidMount() {
    if (this.props.path === '/morphology') {
      this.props.fetchGeoSites();
    }
  }

  render() {
    if (this.props.path === '/morphology') {
      return (
        <MorphologyMap
          geoSite={this.props.geoSite}
          geoSites={this.props.geoSites}
          updateCurrentRegion={d => this.props.updateCurrentRegion(d)}
          geoRegions={this.props.geoRegions}
        />
      );
    }
  }
}

Map.propTypes = {
  fetchGeoSites: PropTypes.func,
  path: PropTypes.string,
  geoSites: PropTypes.array,
  updateCurrentRegion: PropTypes.func,
  geoSite: PropTypes.object,
  geoRegions: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    geoSites: state.geoSite.geoSites,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGeoSites: () => dispatch(fetchGeoSites()),
    updateCurrentRegion: d => dispatch(updateCurrentRegion(d)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
