import React from 'react';
import PropTypes from 'prop-types';
import { cloneDeep, assign, last } from 'lodash';
import { fromJS } from 'immutable';

import { getCombinedLayer, toCamelCase } from '../utils/helpers';

export const GeoMapHOC = (
  WrappedComponent,
  MapControl,
  MapLegend,
  defaultMapStyle,
  getSiteLayer,
  getSiteLayerLarge,
  MapDialog
) => {
  class EnhancedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hoveredFeature: null,
        clickedFeature: null,
        siteIdentity: null,
        siteLat: null,
        siteLon: null,
        mapStyle: defaultMapStyle,
        reserveMapStyle: defaultMapStyle,
        hoverMode: true,
        dialogFeature: null,
      };
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.geoSites) {
        return null;
      }

      if (
        (nextProps.geoSite && nextProps.geoSite !== this.props.geoSite) ||
        Boolean(
          this.props.geoSite &&
            last(this.state.mapStyle.toJS().layers).id !== 'currentSite'
        )
      ) {
        const newLayers = cloneDeep(this.state.mapStyle.toJS().layers).concat(
          getSiteLayerLarge(nextProps.geoSite.geoClass.split('-')[0]).toJS()
        );

        const sitesData = {
          currentSite: {
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  geometry: {
                    type: 'Point',
                    coordinates: [
                      nextProps.geoSite.geometry.coordinates[1],
                      nextProps.geoSite.geometry.coordinates[0],
                    ],
                  },
                  properties: {
                    geoClassId: Number(
                      nextProps.geoSite.geoClass.split('-')[1]
                    ),
                  },
                  type: 'Feature',
                },
              ],
            },
            type: 'geojson',
            cluster: false,
          },
        };

        const newStyle = defaultMapStyle
          .set(
            'sources',
            fromJS(
              assign({}, this.state.mapStyle.get('sources').toJS(), sitesData)
            )
          )
          .set('layers', fromJS(newLayers));

        return this.setState({ mapStyle: newStyle, reserveMapStyle: newStyle });
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

    handleClose() {
      this.setState({ dialogFeature: null });
    }

    setHoverEffect(event) {
      const regionLayer = event.features.find(el => el.properties.Region);
      const geoSite = event.features.find(el => el.properties.siteIdentity);
      //console.log(geoSite.properties.siteIdentity);
      if (geoSite)
        this.setState({
          siteIdentity: geoSite.properties.siteIdentity,
          siteLat: geoSite.geometry.coordinates[1],
          siteLon: geoSite.geometry.coordinates[0],
        });
      else
        this.setState({
          siteIdentity: null,
          siteLat: null,
          siteLon: null,
        });

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
      this.setState({ mapStyle });
    }

    removeSelection() {
      this.setState({
        mapStyle: this.state.reserveMapStyle,
        hoverMode: true,
        clickedFeature: null,
      });
      this.props.updateCurrentRegion('');
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

      this.setState({ mapStyle, reserveMapStyle: mapStyle });
    }

    onHover(event) {
      if (event.features.length === 0 || !this.state.hoverMode) {
        return null;
      }

      if (event.features.some(el => el.properties.Region)) {
        this.setHoverEffect(event);
      } else {
        this.setState({ mapStyle: this.state.reserveMapStyle });
      }
    }

    onClick(event) {
      if (event.features.length === 0) {
        return null;
      } else if (event.features.some(el => el.properties.siteId)) {
        this.setState({
          dialogFeature: event.features.find(e => e.properties.siteId)
            .properties,
        });
      } else if (event.features[0].properties.Region) {
        const clickedFeature = event.features[0].properties.Region;
        this.setState({
          clickedFeature,
          hoverMode: false,
        });
        this.props.updateCurrentRegion(clickedFeature);
        this.setHoverEffect(event);
      }
    }

    renderDialog() {
      if (!this.state.dialogFeature) {
        return null;
      }
      const {
        imageUrl,
        geoClassName,
        geoRegionName,
      } = this.state.dialogFeature;
      return (
        <MapDialog
          title={geoRegionName}
          subtitle={geoClassName}
          imageUrl={imageUrl}
          dialogFeature={this.state.dialogFeature}
          handleClose={() => this.setState({ dialogFeature: null })}
        />
      );
    }

    render() {
      //console.log(this.state.mapStyle.toJS());
      return (
        <div style={{ position: 'relative' }}>
          <WrappedComponent
            mapStyle={this.state.mapStyle}
            {...this.props}
            onClick={e => this.onClick(e)}
            onHover={e => this.onHover(e)}
            siteIdentity={this.state.siteIdentity}
            siteLat={this.state.siteLat}
            siteLon={this.state.siteLon}
          />
          <MapControl
            toggleLayer={(keys, status) => this.toggleLayer(keys, status)}
          />
          <MapLegend
            region={this.state.clickedFeature}
            removeSelection={() => this.removeSelection()}
          />
          {this.renderDialog()}
        </div>
      );
    }
  }

  EnhancedComponent.propTypes = {
    geoSites: PropTypes.array,
    updateCurrentRegion: PropTypes.func,
    geoSite: PropTypes.object,
  };

  return EnhancedComponent;
};
