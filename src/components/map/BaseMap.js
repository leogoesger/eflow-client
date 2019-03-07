import React from 'react';
import MapGL, { Popup } from 'react-map-gl';

import PropTypes from 'prop-types';

import ErrorBoundary from '../shared/ErrorBoundary';
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
      this.setState({ viewport, x: null, y: null });
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <MapGL
          {...this.state.viewport}
          mapStyle={this.props.mapStyle}
          minZoom={5}
          maxZoom={10}
          buffer={0}
          onLoad={() => this.setState({ loading: false })}
          onViewportChange={viewport => this._onViewportChange(viewport)}
          icon-allow-overlap={false}
          mapboxApiAccessToken={process.env.MAPBOX_KEY}
          onHover={e => this.props.onHover(e)}
          onClick={e => this.props.onClick(e)}
        >
          {this.props.siteIdentity && this.props.siteLat && this.props.siteLon && (
            <Popup
              closeButton={false}
              closeOnClick={true}
              tipSize={5}
              latitude={this.props.siteLat}
              longitude={this.props.siteLon}
              anchor={'bottom'}
            >
              <div
                style={{
                  fontSize: '10px',
                  margin: '-5px -5px -5px -5px',
                }}
              >
                {this.props.siteIdentity.replace(/_/g, ' ')}
              </div>
            </Popup>
          )}
          <Loader loading={this.state.loading} />
          {this.props.children}
        </MapGL>
      </ErrorBoundary>
    );
  }
}

BaseMap.propTypes = {
  children: PropTypes.array,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  mapStyle: PropTypes.object,
  siteIdentity: PropTypes.string,
  siteLat: PropTypes.number,
  siteLon: PropTypes.number,
};
