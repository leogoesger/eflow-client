// @flow
/* eslint react/prop-types: 0 */
import * as React from "react";
import { Card, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";

import DialogAttributes from "./DialogAttributes";
import DialogArchetypes from "./DialogArchetypes";
import DialogImages from "./DialogImages";
import Warning from "./Warning";
import MapDialog from "./MapDialog";
import { Colors } from "../../styles";

type Props = {
  geoRegions: Array<GeoRegion>,
  currentRegion: string,
  updateCurrentSite: Function,
};

type State = {
  title: string,
  subtitle: string,
  imageUrl: string,
  dialogFeature: string | null,
  dialogType: string,
  geoClass: ?GeoClass,
};

type GeoClass = {
  name: string,
  description: string,
  archetypes: { [key: string]: any },
  medianAttributes: { [key: string]: number },
  geoSites: Array<any>,
};

type GeoRegion = {
  name: string,
  abbreviation: string,
  geoClasses: Array<GeoClass>,
};

export default class Overview extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: "",
      subtitle: "",
      imageUrl: "",
      dialogFeature: null,
      dialogType: "",
      geoClass: null,
    };
  }

  getGeoClassSubtitle(geoClass: GeoClass): string {
    return `Total sites: ${geoClass.geoSites.length}`;
  }

  getRegionSubtitle(region: GeoRegion) {
    const geoClassCount = region.geoClasses.length;
    let geoSitesCount = 0;
    region.geoClasses.forEach(
      geoClass => (geoSitesCount += geoClass.geoSites.length)
    );
    return `Geomorphology Classifications: ${geoClassCount}; Total sites: ${geoSitesCount}`;
  }

  _onRequestClose() {
    this.setState({ dialogType: "" });
    this.props.updateCurrentSite(null);
  }

  renderDialogContent() {
    switch (this.state.dialogType) {
      case "siteImages":
        return (
          <DialogImages
            updateCurrentSite={d => this.props.updateCurrentSite(d)}
            geoClass={this.state.geoClass}
          />
        );
      case "attributes":
        return <DialogAttributes geoClass={this.state.geoClass} />;
      case "archetypes":
        return <DialogArchetypes geoClass={this.state.geoClass} />;
      default:
        return null;
    }
  }

  renderGeoClasses(region: GeoRegion) {
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
                <div style={{ marginBottom: "20px" }}>
                  {geoClass.description}
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <img
                    src={geoClass.archetypes.syntheticArchetype.imageUrl}
                    alt="archetypes"
                    style={{ height: "220px", cursor: "pointer" }}
                    onClick={() =>
                      this.setState({
                        geoClass,
                        dialogType: "archetypes",
                      })
                    }
                  />
                  {geoClass.geoSites[0].imageUrl ? (
                    <img
                      src={geoClass.geoSites[0].imageUrl}
                      alt="siteImages"
                      style={{ height: "220px", cursor: "pointer" }}
                      onClick={() =>
                        this.setState({
                          geoClass,
                          dialogType: "siteImages",
                        })
                      }
                    />
                  ) : (
                    <Warning />
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    position: "relative",
                  }}
                >
                  <FlatButton
                    label="Median Attributes"
                    style={{ marginTop: "20px" }}
                    labelStyle={{ fontSize: "12px", color: Colors.gold }}
                    onClick={() =>
                      this.setState({
                        geoClass,
                        dialogType: "attributes",
                      })
                    }
                  />
                </div>
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
    const displayedRegions: Array<any> = this.props.geoRegions.filter(
      region =>
        (region.geoClasses.length &&
          region.name === this.props.currentRegion) ||
        !this.props.currentRegion
    );

    if (!displayedRegions.length) {
      return (
        <div style={{ margin: "60px" }}>
          {"Sorry, there is no data to display at the moment :("}
        </div>
      );
    }

    return (
      <div style={{ position: "relative" }}>
        {displayedRegions.map((region: GeoRegion) => {
          return (
            <Card
              key={region.name}
              style={{ marginBottom: "10px" }}
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
                handleClose={() => this.setState({ dialogFeature: null })}
              />
            </Card>
          );
        })}
        ;
        <Dialog
          modal={false}
          open={Boolean(this.state.dialogType)}
          onRequestClose={() => this._onRequestClose()}
          bodyStyle={{ padding: "0px" }}
          contentStyle={{ width: "600px" }}
          style={{ marginLeft: "320px" }}
          overlayStyle={{ opacity: 0.3 }}
        >
          {this.renderDialogContent()}
        </Dialog>
      </div>
    );
  }
}
