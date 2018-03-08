import React from 'react';
import PropTypes from 'prop-types';
import MapGL from 'react-map-gl';

import {defaultMapStyle, gaugeLayer} from './map-style.js';
import {classification} from '../../constants/classification';
import Control from './Control';
import Loader from '../shared/loader/Loader';
import {getGaugeLayer} from '../../utils/helpers';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapStyle: {},
      data: {
        type: 'FeatureCollection',
        features: [],
      },
      mapGL: null,
      viewport: {
        width: 400,
        height: 900,
        latitude: 36.7783,
        longitude: -119.4179,
        zoom: 5.3,
      },
      x: null,
      y: null,
      hoveredFeature: null,
      loading: true,
      gauges: null,
    };
  }

  componentWillMount() {
    this.setState({mapStyle: defaultMapStyle});
  }

  componentDidMount() {
    window.addEventListener('resize', () => this._resize());
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gauges !== this.props.gauges) {
      const mapStyle = getGaugeLayer(
        nextProps.gauges,
        defaultMapStyle,
        gaugeLayer
      );

      this.setState({mapStyle, loading: false});
    }
  }

  _resize() {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth * 0.4,
        height: 800,
      },
    });
  }

  _shouldUpdate(features, offsetX, offsetY, x) {
    return Boolean(
      features.length &&
        (offsetX !== 0 && offsetX !== -1 && offsetY !== 0 && offsetY !== -1) &&
        (Math.abs(this.state.x - offsetX) > 50 ||
          Math.abs(this.state.y - offsetY) > 50 ||
          !x)
    );
  }

  _onViewportChange(viewport) {
    if (!this.state.loading) {
      this.setState({viewport, hoveredFeature: null, x: null, y: null});
    }
  }

  _onHover(event) {
    const {features, srcEvent: {offsetX, offsetY}} = event;
    if (features.find(f => f.layer.id.indexOf('gauges') >= 0)) {
      const hoveredFeature =
        features && features.find(f => f.layer.id.indexOf('gauge') >= 0);
      return this.setState({hoveredFeature, x: offsetX, y: offsetY});
    } else {
      const hoveredFeature =
        features && features.find(f => f.layer.id.indexOf('class') >= 0);
      if (this._shouldUpdate(features, offsetX, offsetY, this.state.x)) {
        this.setState({hoveredFeature, x: offsetX, y: offsetY});
      }
    }
  }

  _hideLayer(className) {
    const arrayIndex = this.state.mapStyle
      .get('layers')
      .toJS()
      .findIndex(item => item.id === className);

    if (
      this.state.mapStyle.getIn([
        'layers',
        arrayIndex,
        'layout',
        'visibility',
      ]) === 'visible'
    ) {
      const mapStyle = this.state.mapStyle.setIn(
        ['layers', `${arrayIndex}`, 'layout', 'visibility'],
        'none'
      );
      this.setState({mapStyle});
    } else {
      const mapStyle = this.state.mapStyle.setIn(
        ['layers', arrayIndex, 'layout', 'visibility'],
        'visible'
      );
      this.setState({mapStyle});
    }
  }

  _renderTooltip() {
    const {hoveredFeature, x, y} = this.state;

    if (!x || !y) {
      return;
    }

    if (hoveredFeature.layer.id.indexOf('class') >= 0) {
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
    } else {
      return (
        hoveredFeature && (
          <div
            className="tooltip"
            style={{position: 'absolute', left: x, top: y}}
          >
            <div>{hoveredFeature.properties.stationName}</div>
          </div>
        )
      );
    }
  }

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        mapStyle={this.state.mapStyle}
        minZoom={5}
        maxZoom={8}
        buffer={0}
        icon-allow-overlap={false}
        onHover={e => this._onHover(e)}
        onViewportChange={viewport => this._onViewportChange(viewport)}
        mapboxApiAccessToken="pk.eyJ1IjoibGVvZ29lc2dlciIsImEiOiJjamU3dDEwZDkwNmJ5MnhwaHM1MjlydG8xIn0.UcVFjCvl3PTPI8jiOnPbYA"
      >
        {this._renderTooltip()}
        <Control hideLayer={className => this._hideLayer(className)} />
        <Loader loading={this.state.loading} />
      </MapGL>
    );
  }
}

Map.propTypes = {
  gauges: PropTypes.array,
};
