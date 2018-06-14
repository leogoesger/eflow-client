import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardText } from "material-ui/Card";
<<<<<<< HEAD
import PhotoCamera from "material-ui/svg-icons/image/photo-camera";
=======
import FlatButton from "material-ui/FlatButton";
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
} from "material-ui/Table";
>>>>>>> modify overview geo page

import MapDialog from "./MapDialog";
import { Colors } from "../../styles";

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      subtitle: "",
      imageUrl: "",
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
<<<<<<< HEAD
                {geoClass.geoSites.map(geoSite => {
                  return (
                    <Card key={geoSite.identity}>
                      <CardHeader
                        actAsExpander={false}
                        showExpandableButton={geoSite.imageUrl ? true : false}
                        title={geoSite.identity}
                        style={{ cursor: "pointer" }}
                        openIcon={<PhotoCamera color={Colors.gold} />}
                        closeIcon={<PhotoCamera color={Colors.gold} />}
                        onClick={() =>
                          this.setState({
                            title: region.name,
                            subtitle: geoClass.name,
                            imageUrl: geoSite.imageUrl,
                            dialogFeature: { feature: "newFeature" },
                          })
                        }
                      />
                    </Card>
                  );
                })}
=======
                <div style={{ marginBottom: "20px" }}>
                  {
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris "
                  }
                </div>

                <Table fixedHeader={true}>
                  <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                    enableSelectAll={false}
                    style={{ height: "40px", padding: "0px" }}
                  >
                    <TableRow style={{ height: "20px" }}>
                      <TableHeaderColumn style={{ height: "20px" }}>
                        {"Data1"}
                      </TableHeaderColumn>
                      <TableHeaderColumn style={{ height: "20px" }}>
                        {"Data2"}
                      </TableHeaderColumn>
                      <TableHeaderColumn style={{ height: "20px" }}>
                        {"Data2"}
                      </TableHeaderColumn>
                      <TableHeaderColumn style={{ height: "20px" }}>
                        {"Data2"}
                      </TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={false}
                    deselectOnClickaway={true}
                    showRowHover={true}
                    stripedRows={false}
                  >
                    <TableRow
                      style={{
                        height: "40px",
                        padding: "0px",
                        cursor: "pointer",
                      }}
                    >
                      <TableRowColumn
                        style={{ height: "15px", paddingTop: "15px" }}
                      >
                        {1}
                      </TableRowColumn>
                      <TableRowColumn style={{ height: "15px" }}>
                        {2}
                      </TableRowColumn>
                      <TableRowColumn style={{ height: "15px" }}>
                        {2}
                      </TableRowColumn>
                      <TableRowColumn style={{ height: "15px" }}>
                        {2}
                      </TableRowColumn>
                    </TableRow>
                    <TableRow
                      style={{
                        height: "40px",
                        padding: "0px",
                        cursor: "pointer",
                      }}
                    >
                      <TableRowColumn
                        style={{ height: "15px", paddingTop: "15px" }}
                      >
                        {1}
                      </TableRowColumn>
                      <TableRowColumn style={{ height: "15px" }}>
                        {2}
                      </TableRowColumn>
                      <TableRowColumn style={{ height: "15px" }}>
                        {2}
                      </TableRowColumn>
                      <TableRowColumn style={{ height: "15px" }}>
                        {2}
                      </TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <FlatButton
                    label="Images"
                    style={{ marginLeft: "20px" }}
                    labelStyle={{ fontSize: "12px", color: Colors.gold }}
                  />
                  <FlatButton
                    label="archetypes"
                    style={{ marginLeft: "20px" }}
                    labelStyle={{ fontSize: "12px", color: Colors.gold }}
                  />
                </div>
>>>>>>> modify overview geo page
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
<<<<<<< HEAD
    return this.props.geoRegions.map(region => {
      if (region.geoClasses.length) {
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
      }
=======
    const displayedRegions = this.props.geoRegions.filter(
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

    return displayedRegions.map(region => {
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
>>>>>>> modify overview geo page
    });
  }
}

Overview.propTypes = {
  geoRegions: PropTypes.array,
  currentRegion: PropTypes.string,
};
