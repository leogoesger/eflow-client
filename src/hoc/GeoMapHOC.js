import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import {Card, CardHeader, CardMedia} from 'material-ui/Card';

import {getCombinedLayer, toCamelCase} from '../utils/helpers';

export const GeoMapHOC = (
  WrappedComponent,
  MapControl,
  MapLegend,
  defaultMapStyle,
  getSiteLayer
) => {
  class EnhancedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hoveredFeature: null,
        clickedFeature: null,
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
      this.setState({dialogFeature: null});
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
      if (event.features.length === 0 || !this.state.hoverMode) {
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
        this.setHoverEffect(event);
      }
    }

    renderDialog() {
      if (!this.state.dialogFeature) {
        return null;
      }
      const {imageUrl, geoClassName, geoRegionName} = this.state.dialogFeature;
      return (
        <Dialog
          modal={false}
          open={Boolean(this.state.dialogFeature)}
          onRequestClose={() => this.handleClose()}
          bodyStyle={{padding: '0px'}}
        >
          <Card style={{height: '500px', padding: '0px'}}>
            <CardHeader title={geoRegionName} subtitle={geoClassName} />
            {imageUrl ? (
              <CardMedia>
                <img src={imageUrl} alt="image" />
              </CardMedia>
            ) : (
              <div style={styles.sorry}>{'Sorry, no image avaiable :('}</div>
            )}
          </Card>
        </Dialog>
      );
    }

    render() {
      return (
        <div style={{position: 'relative'}}>
          <WrappedComponent
            mapStyle={this.state.mapStyle}
            {...this.props}
            onClick={e => this.onClick(e)}
            onHover={e => this.onHover(e)}
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
  const styles = {
    sorry: {
      height: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
  EnhancedComponent.propTypes = {
    geoSites: PropTypes.array,
  };
  return EnhancedComponent;
};
