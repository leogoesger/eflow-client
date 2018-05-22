import React from 'react';
import MapGL from 'react-map-gl';

import {defaultMapStyle} from './MapStyle.js';
import {classification} from '../../constants/classification';
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
      x: null,
      y: null,
      hoveredFeature: null,
    };
  }

  _onViewportChange(viewport) {
    if (!this.state.loading) {
      this.setState({viewport, hoveredFeature: null, x: null, y: null});
    }
  }

  _onHover(event) {
    if (event.features.length === 0) {
      return null;
    }
    const {features, srcEvent: {offsetX, offsetY}} = event,
      hoveredFeature = features[0].properties.CLASS
        ? classification[features[0].properties.CLASS - 1]
        : features[0].properties.Region;
    this.setState({hoveredFeature, x: offsetX, y: offsetY});
  }

  _renderTooltip() {
    const {hoveredFeature, x, y} = this.state;
    if (!hoveredFeature || !x || !y) {
      return null;
    }

    return (
      <div className="tooltip" style={{position: 'absolute', left: x, top: y}}>
        <div>{hoveredFeature}</div>
      </div>
    );
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
        onHover={e => this._onHover(e)}
      >
        <Loader loading={this.state.loading} />
        {this._renderTooltip()}
      </MapGL>
    );
  }
}
