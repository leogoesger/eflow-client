import React from 'react';
import PropTypes from 'prop-types';

import {defaultMapStyle, getSiteLayer} from './MapStyle.js';
import {getCombinedLayer, toCamelCase} from '../../utils/helpers';
import MapControl from './MapControl';
import MapLegend from './MapLegend';

export const MapHOC = WrappedComponent => {
  class EnhancedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hoveredFeature: null,
        clickedFeature: null,
        mapStyle: defaultMapStyle,
        reserveMapStyle: defaultMapStyle,
        hoverMode: true,
      };
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.geoSites) {
        return null;
      }
      const mapStyle = getCombinedLayer(
        nextProps.geoSites,
        defaultMapStyle,
        getSiteLayer
      );
      this.setState({
        mapStyle,
        reserveMapStyle: mapStyle,
      });
    }

    setHoverEffect(event) {
      const regionLayer = event.features.find(el => el.properties.Region);
      const regionIndex = this.state.reserveMapStyle
        .get('layers')
        .toJS()
        .findIndex(
          e => e.id === `region-${toCamelCase(regionLayer.properties.Region)}`
        );

      const mapStyle = this.state.reserveMapStyle.setIn(
        ['layers', regionIndex, 'paint', 'fill-color'],
        'hsla(0, 0%, 0%, 0.4)'
      );
      this.setState({mapStyle});
    }

    removeSelection() {
      this.setState({
        mapStyle: this.state.reserveMapStyle,
        hoverMode: true,
        clickedFeature: null,
      });
    }

    toggleLayer(layerKeys, status) {
      let mapStyle = this.state.mapStyle;
      mapStyle
        .get('layers')
        .toJS()
        .map((layer, index) => {
          if (layer.id.includes(layerKeys)) {
            mapStyle = mapStyle.setIn(
              ['layers', index, 'layout', 'visibility'],
              status
            );
          }
        });
      this.setState({mapStyle, reserveMapStyle: mapStyle});
    }

    onHover(event) {
      if (event.features.length === 0 || !this.state.hoverMode) {
        return null;
      }

      if (event.features.some(el => el.properties.Region)) {
        this.setHoverEffect(event);
      } else {
        this.setState({mapStyle: this.state.reserveMapStyle});
      }
    }

    onClick(event) {
      if (event.features.length === 0) {
        return null;
      } else if (event.features.some(el => el.properties.Region)) {
        const clickedFeature = event.features.find(el => el.properties.Region)
          .properties.Region;
        this.setState({clickedFeature, hoverMode: false});
        this.setHoverEffect(event);
      }
    }

    render() {
      return (
        <WrappedComponent
          mapStyle={this.state.mapStyle}
          {...this.props}
          onClick={e => this.onClick(e)}
          onHover={e => this.onHover(e)}
        >
          <MapControl
            toggleLayer={(keys, status) => this.toggleLayer(keys, status)}
          />
          <MapLegend
            region={this.state.clickedFeature}
            removeSelection={() => this.removeSelection()}
          />
        </WrappedComponent>
      );
    }
  }
  EnhancedComponent.propTypes = {
    geoSites: PropTypes.array,
  };
  return EnhancedComponent;
};
