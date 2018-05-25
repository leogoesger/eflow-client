import React from 'react';
import MapGL from 'react-map-gl';
import PropTypes from 'prop-types';

import Loader from '../shared/loader/Loader';

export default class BaseMap extends React.Component {
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
      this.setState({viewport, x: null, y: null});
    }
  }

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        mapStyle={this.props.mapStyle}
        minZoom={5}
        maxZoom={10}
        buffer={0}
        onLoad={() => this.setState({loading: false})}
        onViewportChange={viewport => this._onViewportChange(viewport)}
        icon-allow-overlap={false}
        mapboxApiAccessToken={process.env.MAPBOX_KEY}
        onHover={e => this.props.onHover(e)}
        onClick={e => this.props.onClick(e)}
      >
        <Loader loading={this.state.loading} />
        {this.props.children}
      </MapGL>
    );
  }
}

BaseMap.propTypes = {
  children: PropTypes.array,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  mapStyle: PropTypes.object,
};
