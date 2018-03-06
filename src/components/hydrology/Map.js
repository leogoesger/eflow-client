import React from 'react';
import PropTypes from 'prop-types';
import MapGL from 'react-map-gl';
import _ from 'lodash';
import {fromJS} from 'immutable';

import {defaultMapStyle, dataLayer} from './map-style.js';
import {classification} from '../../constants/classification.js';
import Control from './Control';

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
        zoom: 5,
      },
      x: null,
      y: null,
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
    // if (nextProps.classifications !== this.state.classifications) {
    //   const combinedMapStyle = {};
    //   const combinedLayer = [];
    //   nextProps.classifications.forEach(geoClass => {
    //     combinedMapStyle[`class${geoClass.classId}`] = {
    //       data: geoClass.geometry,
    //       type: 'geojson',
    //     };
    //
    //     let newDataLayer = dataLayer
    //       .set('source', `class${geoClass.classId}`)
    //       .set('id', `class${geoClass.classId}`);
    //     combinedLayer.push(newDataLayer.toJS());
    //   });
    //
    //   const newCombinedLayer = fromJS(
    //     defaultMapStyle
    //       .get('layers')
    //       .toJS()
    //       .concat(combinedLayer)
    //   );
    //
    //   const mapStyle = defaultMapStyle
    //     .set(
    //       'sources',
    //       fromJS(
    //         _.assign(
    //           {},
    //           defaultMapStyle.get('sources').toJS(),
    //           combinedMapStyle
    //         )
    //       )
    //     )
    //     .set('layers', newCombinedLayer);
    //
    //   this.setState({mapStyle});
    // }
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

  _onHover(event) {
    const {features, srcEvent: {offsetX, offsetY}} = event;
    const hoveredFeature =
      features && features.find(f => f.layer.id === 'data');
    if (this._shouldUpdate(features, offsetX, offsetY, this.state.x)) {
      this.setState({hoveredFeature, x: offsetX, y: offsetY});
    }
  }

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
      <MapGL
        {...this.state.viewport}
        mapStyle={this.state.mapStyle}
        minZoom={5}
        maxZoom={8}
        onHover={e => this._onHover(e)}
        onViewportChange={viewport => this._onViewportChange(viewport)}
        mapboxApiAccessToken="pk.eyJ1IjoibGVvZ29lc2dlciIsImEiOiJjamU3dDEwZDkwNmJ5MnhwaHM1MjlydG8xIn0.UcVFjCvl3PTPI8jiOnPbYA"
      >
        {this._renderTooltip()}
        <Control />
      </MapGL>
    );
  }
}

Map.propTypes = {
  classifications: PropTypes.array,
};
