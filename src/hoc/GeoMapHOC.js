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
        checkedClasses: {
          SAC: {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            8: true,
            9: true,
            10: true,
          },
          SFE: {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
          },
        },
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
        getSiteLayer,
        this.state.checkedClasses
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

      if (['class', 'satellite'].indexOf(layerKeys) < 0) {
        if (status === 'none') {
          this.setState(
            {
              checkedClasses: {
                ...this.changedCheckedStatus(layerKeys, false),
              },
            },
            () => this.updateCombinedLayer()
          );
        }
        if (status === 'visible') {
          let tmp = this.changedCheckedStatus(layerKeys, true);
          this.setState(
            {
              checkedClasses: { ...tmp },
            },
            () => this.updateCombinedLayer()
          );
        }
      }

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

    changedCheckedStatus(region, status) {
      const tmp = cloneDeep(this.state.checkedClasses);

      Object.keys(tmp[region]).forEach(cls => {
        tmp[region][cls] = status;
      });
      //console.log(tmp);
      return tmp;
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

    updateCombinedLayer() {
      const mapStyle = getCombinedLayer(
        this.props.geoSites,
        defaultMapStyle,
        getSiteLayer,
        this.state.checkedClasses
      );
      this.setState({
        mapStyle,
        reserveMapStyle: mapStyle,
      });
    }

    handleCheckedBox(reg, cls) {
      const tmpCheckedClasses = cloneDeep(this.state.checkedClasses);
      tmpCheckedClasses[reg][cls] = !this.state.checkedClasses[reg][cls];
      this.setState({ checkedClasses: { ...tmpCheckedClasses } }, () =>
        this.updateCombinedLayer()
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
            handleCheckedBox={(reg, cls) => this.handleCheckedBox(reg, cls)}
            checkedClasses={this.state.checkedClasses}
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
