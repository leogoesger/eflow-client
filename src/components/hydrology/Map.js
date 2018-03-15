import React from 'react';
import PropTypes from 'prop-types';
import MapGL from 'react-map-gl';
import {debounce, assign} from 'lodash';
import {fromJS} from 'immutable';

import {defaultMapStyle, gaugeLayer, hoveredGaugeLayer} from './map-style.js';
import {classification} from '../../constants/classification';
import Control from './Control';
import Loader from '../shared/loader/Loader';
import {getGaugeLayer} from '../../utils/helpers';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapStyle: defaultMapStyle,
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
    };
    this.requestFeature = debounce(
      hoveredFeature => this._requestCurrentFeature(hoveredFeature),
      200
    );
  }

  componentDidMount() {
    window.addEventListener('resize', () => this._resize());
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gauges && this.props.gauges !== nextProps.gauges) {
      const mapStyle = getGaugeLayer(
        nextProps.gauges,
        defaultMapStyle,
        gaugeLayer
      );
      this.setState({mapStyle});
    } else if (nextProps.hoveredGauge) {
      this._updateCurrentHoverGauge(nextProps);
    } else {
      return null;
    }

    // this._updateCurrentHoverGauge(nextProps);
  }

  _updateCurrentHoverGauge(nextProps) {
    if (nextProps.hoveredGauge && nextProps.hoveredGauge.geometry) {
      const hoveredGauge = {
        hoveredGauge: {
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [
                    nextProps.hoveredGauge.geometry.coordinates[1],
                    nextProps.hoveredGauge.geometry.coordinates[0],
                  ],
                },
                properties: {classId: nextProps.hoveredGauge.classId},
              },
            ],
          },
          type: 'geojson',
        },
      };

      //If the layer is not exist yet, this will create a new layer
      if (
        !this.state.mapStyle
          .get('layers')
          .toJS()
          .find(e => e.id == 'hoveredGauge')
      ) {
        const newCombinedLayer = fromJS(
          this.state.mapStyle
            .get('layers')
            .toJS()
            .concat(hoveredGaugeLayer)
        );
        const newMapStyle = this.state.mapStyle
          .set(
            'sources',
            fromJS(
              assign(
                {},
                this.state.mapStyle.get('sources').toJS(),
                hoveredGauge
              )
            )
          )
          .set('layers', newCombinedLayer);
        return this.setState({mapStyle: newMapStyle});
      }

      const newMapStyle = this.state.mapStyle.set(
        'sources',
        fromJS(
          assign({}, this.state.mapStyle.get('sources').toJS(), hoveredGauge)
        )
      );
      this.setState({mapStyle: newMapStyle});
    }
  }

  _requestCurrentFeature(hoveredFeature) {
    if (hoveredFeature.layer.id.indexOf('class') >= 0) {
      this.props.fetchClassification(hoveredFeature.properties.CLASS);
    } else {
      this.props.fetchCurrentGauge(hoveredFeature.properties.gaugeId);
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
      if (
        hoveredFeature &&
        this.state.hoveredFeature &&
        hoveredFeature.properties.gaugeId !==
          this.state.hoveredFeature.properties.gaugeId
      ) {
        this.requestFeature(hoveredFeature);
        return this.setState({hoveredFeature, x: offsetX, y: offsetY});
      }
    } else {
      const hoveredFeature =
        features && features.find(f => f.layer.id.indexOf('class') >= 0);
      if (this._shouldUpdate(features, offsetX, offsetY, this.state.x)) {
        this.requestFeature(hoveredFeature);
        this.setState({hoveredFeature, x: offsetX, y: offsetY});
      }
    }
  }

  _hideLayer(className, condition) {
    const arrayIndex = this.state.mapStyle
      .get('layers')
      .toJS()
      .findIndex(item => item.id === className);

    if (condition) {
      const mapStyle = this.state.mapStyle.setIn(
        ['layers', `${arrayIndex}`, 'layout', 'visibility'],
        'visible'
      );
      this.setState({mapStyle});
    } else {
      const mapStyle = this.state.mapStyle.setIn(
        ['layers', arrayIndex, 'layout', 'visibility'],
        'none'
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
        onLoad={() => this.setState({loading: false})}
        icon-allow-overlap={false}
        onHover={e => this._onHover(e)}
        onViewportChange={viewport => this._onViewportChange(viewport)}
        mapboxApiAccessToken="pk.eyJ1IjoibGVvZ29lc2dlciIsImEiOiJjamU3dDEwZDkwNmJ5MnhwaHM1MjlydG8xIn0.UcVFjCvl3PTPI8jiOnPbYA"
      >
        {this._renderTooltip()}
        <Control
          hideLayer={(className, condition) =>
            this._hideLayer(className, condition)
          }
        />
        <Loader loading={this.state.loading} />
      </MapGL>
    );
  }
}

Map.propTypes = {
  gauges: PropTypes.array,
  hoveredGauge: PropTypes.object,
  fetchCurrentGauge: PropTypes.func,
  fetchClassification: PropTypes.func,
};
