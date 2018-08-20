import React from "react";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";

import { navigateTo } from "../../utils/helpers";
import { Colors } from "../../styles";

export default class EcologyCard extends React.Component {
  _navigateTo(location) {
    window.scrollTo(0, 0);
    navigateTo(location);
  }

  _handleMessageClose() {
    this.setState({ showMessage: false, message: "" });
  }

  render() {
    return (
      <Paper style={styles.tabsCard} zDepth={2}>
        <div style={styles.left}>
          <img
            src="https://s3-us-west-1.amazonaws.com/funcflow/resources/ecology_overview.jpg"
            style={{
              flexShrink: 0,
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <div style={styles.right}>
          <div className="title">
            {
              "Assess performance of ecosystem functions - related to aquatic species habitat, riparian species habitat, and natural hydrogeomorphic processes - under alternative hydrologic and geomorphic scenarios"
            }
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <RaisedButton
              className="tour-explore-hydrology"
              label="Explore Ecology"
              backgroundColor={Colors.gold}
              labelColor={Colors.white}
              onClick={() => this._navigateTo("/ecology")}
              labelStyle={{ fontSize: "12px" }}
            />
          </div>
        </div>
      </Paper>
    );
  }
}

const styles = {
  tabsCard: {
    margin: "40px auto",
    borderRadius: "2px",
    width: "1050px",
    display: "flex",
    justifyContent: "space-between",
    padding: "0",
    height: "500px",
  },

  subContainer: {
    display: "flex",
    justifyContent: "space-around",
  },

  subContainerCard: {
    boxShadow: "none",
    width: "30%",
  },

  right: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
  },

  left: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "110%",
    height: "400px",
    marginTop: "30px",
  },

  title: {
    color: "#424242",
    width: "70%",
    fontWeight: "600",
    lineHeight: "20px",
    paddingLeft: "15px",
    paddingRight: "0px",
    paddingBottom: "0px",
    fontSize: "14px",
    height: "35px",
  },

  text: {
    lineHeight: "20px",
    color: "#757575",
  },
};
