import React from "react";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Book from "material-ui/svg-icons/action/book";
import { Card, CardText } from "material-ui/Card";

import { navigateTo } from "../../utils/helpers";
import { Colors } from "../../styles";

export default class HydrologyCard extends React.Component {
  _handleMessageClose() {
    this.setState({ showMessage: false, message: "" });
  }

  render() {
    return (
      <Paper style={styles.tabsCard} zDepth={2}>
        <div style={styles.left}>
          <img
            src="https://s3-us-west-1.amazonaws.com/funcflow/resources/hydrology.png"
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
              "Explore and visualize California's natural (unimpaired) streamflow patterns, including natural stream classes and functional flow metrics"
            }
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              paddingLeft: "25px",
            }}
          >
            <RaisedButton
              className="tour-explore-hydrology"
              label="Explore Hydrology"
              backgroundColor={Colors.gold}
              labelColor={Colors.white}
              onClick={() => navigateTo("/hydrology")}
              labelStyle={{ fontSize: "12px" }}
            />
            <FlatButton
              href="https://eflow.gitbook.io/project/eflows-website"
              target="_blank"
              className="tour-how-hydrology"
              label="How does it work?"
              style={{ marginLeft: "20px" }}
              labelStyle={{ fontSize: "12px", color: Colors.gold }}
              icon={<Book color={Colors.gold} />}
            />
          </div>
          <div style={styles.subContainer}>
            <Card style={styles.subContainerCard}>
              <div style={styles.title}>{"Stream Classification"}</div>
              <CardText style={styles.text}>
                {
                  "California is organized into nine stream classes with distinct natural flow regime patterns and watershed controls."
                }
              </CardText>
            </Card>

            <Card style={{ ...styles.subContainerCard, width: "33%" }}>
              <div style={{ ...styles.title, minWidth: "175px" }}>
                {"Dimensionless Reference Hydrographs"}
              </div>
              <CardText style={styles.text}>
                {
                  "Summary stream class hydrographs illustrate season and inter-annual daily flow patterns."
                }
              </CardText>
            </Card>

            <Card style={styles.subContainerCard}>
              <div style={styles.title}>{"Functional Flow Metrics"}</div>
              <CardText style={styles.text}>
                {
                  "Flow metrics quantify key aspects of the natural flow regime linked to critical ecosystem functions."
                }
              </CardText>
            </Card>
          </div>
        </div>
      </Paper>
    );
  }
}

const styles = {
  tabsCard: {
    margin: "0 auto",
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
    width: "58%",
  },

  left: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
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
