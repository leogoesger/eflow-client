import React from 'react';
import MapGL from 'react-map-gl';
import {defaultMapStyle} from './map-style.js';

import Loader from '../shared/loader/Loader';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      viewport: {
        width: 600,
        height: 800,
        latitude: 36.7783,
        longitude: -119.4179,
        zoom: 5.3,
      },
    };
  }

  _onViewportChange(viewport) {
    if (!this.state.loading) {
      this.setState({viewport, hoveredFeature: null, x: null, y: null});
    }
  }

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        mapStyle={defaultMapStyle}
        minZoom={5}
        maxZoom={8}
        buffer={0}
        onLoad={() => this.setState({loading: false})}
        onViewportChange={viewport => this._onViewportChange(viewport)}
        icon-allow-overlap={false}
        mapboxApiAccessToken={process.env.MAPBOX_KEY}
      >
        <Loader loading={this.state.loading} />
      </MapGL>
    );
  }
}
