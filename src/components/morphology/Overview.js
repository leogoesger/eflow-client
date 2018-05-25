import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import PhotoCamera from 'material-ui/svg-icons/image/photo-camera';

import MapDialog from './MapDialog';
import {Colors} from '../../styles';

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      subtitle: '',
      imageUrl: '',
      dialogFeature: null,
    };
  }

  getGeoClassSubtitle(geoClass) {
    return `Total sites: ${geoClass.geoSites.length}`;
  }

  getRegionSubtitle(region) {
    const geoClassCount = region.geoClasses.length;
    let geoSitesCount = 0;
    region.geoClasses.forEach(
      geoClass => (geoSitesCount += geoClass.geoSites.length)
    );
    return `Geomorphology Classifications: ${geoClassCount}; Total sites: ${geoSitesCount}`;
  }

  renderGeoClasses(region) {
    return (
      <CardText expandable={true}>
        {region.geoClasses.map(geoClass => {
          return (
            <Card key={geoClass.name}>
              <CardHeader
                title={geoClass.name}
                subtitle={this.getGeoClassSubtitle(geoClass)}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                {geoClass.geoSites.map(geoSite => {
                  return (
                    <Card key={geoSite.identity}>
                      <CardHeader
                        actAsExpander={false}
                        showExpandableButton={geoSite.imageUrl ? true : false}
                        title={geoSite.identity}
                        style={{cursor: 'pointer'}}
                        openIcon={<PhotoCamera color={Colors.gold} />}
                        closeIcon={<PhotoCamera color={Colors.gold} />}
                        onClick={() =>
                          this.setState({
                            title: region.name,
                            subtitle: geoClass.name,
                            imageUrl: geoSite.imageUrl,
                            dialogFeature: {feature: 'newFeature'},
                          })
                        }
                      />
                    </Card>
                  );
                })}
              </CardText>
            </Card>
          );
        })}
      </CardText>
    );
  }
  render() {
    if (!this.props.geoRegions) {
      return null;
    }
    return this.props.geoRegions.map(region => {
      if (region.geoClasses.length) {
        return (
          <Card
            key={region.name}
            style={{marginBottom: '10px'}}
            initiallyExpanded={true}
          >
            <CardHeader
              title={region.name}
              subtitle={this.getRegionSubtitle(region)}
              actAsExpander={true}
              showExpandableButton={true}
            />
            {this.renderGeoClasses(region)}
            <MapDialog
              {...this.state}
              handleClose={() => this.setState({dialogFeature: null})}
            />
          </Card>
        );
      }
    });
  }
}

Overview.propTypes = {
  geoRegions: PropTypes.array,
};
