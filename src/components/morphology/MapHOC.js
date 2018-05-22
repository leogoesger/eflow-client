import React from 'react';
import PropTypes from 'prop-types';

import {defaultMapStyle, siteLayer} from './MapStyle.js';
import {classification} from '../../constants/classification';
import {getCombinedLayer} from '../../utils/helpers';
import MapControl from './MapControl';

export const MapHOC = WrappedComponent => {
  class EnhancedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hoveredFeature: null,
        x: null,
        y: null,
        mapStyle: defaultMapStyle,
      };
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.geoSites) {
        return null;
      }
      this.setState({
        mapStyle: getCombinedLayer(
          nextProps.geoSites,
          defaultMapStyle,
          siteLayer
        ),
      });
    }

    toggleLayer(layerKeys, status) {
      let mapStyle = this.state.mapStyle;
      mapStyle
        .get('layers')
        .toJS()
        .map((layer, index) => {
          if (layerKeys.some(e => layer.id.includes(e))) {
            mapStyle = mapStyle.setIn(
              ['layers', index, 'layout', 'visibility'],
              status
            );
          }
        });
      this.setState({mapStyle});
    }

    onHover(event) {
      if (event.features.length === 0) {
        return null;
      }
      const {features, srcEvent: {offsetX, offsetY}} = event,
        properties = features[0].properties;

      let hoveredFeature;

      if (properties.siteIdentity) {
        hoveredFeature = `${properties.geoClassName}: ${
          properties.siteIdentity
        }`;
      } else if (properties.CLASS) {
        hoveredFeature = classification[properties.CLASS - 1];
      } else {
        hoveredFeature = properties.Region;
      }

      this.setState({hoveredFeature, x: offsetX, y: offsetY});
    }

    render() {
      return (
        <WrappedComponent
          mapStyle={this.state.mapStyle}
          {...this.props}
          onHover={e => this.onHover(e)}
          hoveredFeature={this.state.hoveredFeature}
          x={this.state.x}
          y={this.state.y}
        >
          <MapControl
            toggleLayer={(keys, status) => this.toggleLayer(keys, status)}
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
