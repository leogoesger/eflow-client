import React from 'react';
import MapGL from 'react-map-gl';
import {defaultMapStyle, dataLayer} from './map-style.js';

import {fromJS} from 'immutable';
import geoJson from './sample.json';
import {classification} from '../../constants/classification.js';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapStyle: defaultMapStyle,
      data: null,
      mapGL: null,
      viewport: {
        width: 600,
        height: 800,
        latitude: 36.7783,
        longitude: -119.4179,
        zoom: 5,
      },
      x: null,
      y: null,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
    this.setState({mapGL: this.mapRef.getMap()});
    setTimeout(() => (window.state2 = this.state), 1000);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth * 0.44,
        height: window.innerHeight,
      },
    });
  };

  _shouldUpdate(features, offsetX, offsetY, x) {
    return Boolean(
      features.length &&
        (offsetX !== 0 && offsetX !== -1 && offsetY !== 0 && offsetY !== -1) &&
        (Math.abs(this.state.x - offsetX) > 50 ||
          Math.abs(this.state.y - offsetY) > 50 ||
          !x)
    );
  }

  _loadData = data => {
    const mapStyle = defaultMapStyle
      .setIn(['sources', 'classData'], fromJS({type: 'geojson', data}))
      .set('layers', defaultMapStyle.get('layers').push(dataLayer));

    this.setState({data, mapStyle});
  };

  _onHover = event => {
    const {features, srcEvent: {offsetX, offsetY}} = event;
    const hoveredFeature =
      features && features.find(f => f.layer.id === 'data');
    if (this._shouldUpdate(features, offsetX, offsetY, this.state.x)) {
      this.setState({hoveredFeature, x: offsetX, y: offsetY});
    }
  };

  _onViewportChange(viewport) {
    this.setState({viewport, hoveredFeature: null, x: null, y: null});
  }

  _renderTooltip() {
    const {hoveredFeature, x, y} = this.state;

    if (!x || !y) {
      return;
    }
    return (
      hoveredFeature && (
        <div
          className="tooltip"
          style={{position: 'absolute', left: x, top: y}}
        >
          <div>{classification[hoveredFeature.properties.CLASS - 1]}</div>
        </div>
      )
    );
  }

  render() {
    return (
      <div>
        <MapGL
          ref={map => (this.mapRef = map)}
          {...this.state.viewport}
          mapStyle={this.state.mapStyle}
          onLoad={() => this._loadData(geoJson)}
          onHover={e => this._onHover(e)}
          onViewportChange={viewport => this._onViewportChange(viewport)}
          mapboxApiAccessToken="pk.eyJ1IjoibGVvZ29lc2dlciIsImEiOiJjamU3dDEwZDkwNmJ5MnhwaHM1MjlydG8xIn0.UcVFjCvl3PTPI8jiOnPbYA"
        >
          {this._renderTooltip()}
        </MapGL>
      </div>
    );
  }
}
