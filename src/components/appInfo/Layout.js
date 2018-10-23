import React from "react";
import PropTypes from "prop-types";
import { Divider } from "material-ui";
import { Card, CardHeader, CardText } from "material-ui/Card";
import { List, ListItem } from "material-ui/List";
import Merge from "material-ui/svg-icons/communication/call-merge";

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  rednerAppData(appData) {
    return (
      <Card>
        <CardHeader
          title={`Commit Message: ${appData.message}`}
          actAsExpander={true}
          showExpandableButton={true}
          style={{ padding: "15px" }}
        />
        <CardText expandable={true} style={{ paddingTop: "5px" }}>
          <h1 style={{ padding: "5px 5px 5px 20px" }}>
            Version: {appData.version}
          </h1>
          <h1 style={{ padding: "5px 5px 5px 20px" }}>
            Commit Author: {appData.author}
          </h1>
          <h1 style={{ padding: "5px 5px 5px 20px" }}>
            Commit Date: {appData.date}
          </h1>

          <List>
            <h1 style={{ paddingLeft: "20px" }}>Files changed:</h1>
            {appData.files.map((file, inx) => {
              return (
                <ListItem
                  key={inx}
                  primaryText={file}
                  leftIcon={<Merge />}
                  style={{ paddingLeft: "10px" }}
                />
              );
            })}
          </List>
        </CardText>
      </Card>
    );
  }

  render() {
    const { client, nodeAPI, flaskAPI } = this.props.appInfo;
    return (
      <div>
        <div>
          <h1 style={{ fontWeight: "bold", padding: "40px 20px" }}>App Info</h1>
        </div>
        <Divider />
        <Card style={{ paddingLeft: "30px" }}>
          <CardHeader
            title="Server Side"
            actAsExpander={true}
            showExpandableButton={true}
          />
          {nodeAPI && (
            <CardText expandable={true}>
              <div>
                <h1 style={{ padding: "10px 10px 10px 20px" }}>
                  Repo: Node API
                </h1>
              </div>
              <div>{this.rednerAppData(nodeAPI)}</div>
            </CardText>
          )}
          {flaskAPI && (
            <CardText expandable={true}>
              <div>
                <h1 style={{ padding: "10px 10px 10px 20px" }}>
                  Repo: Flask API
                </h1>
              </div>
              <div>{this.rednerAppData(flaskAPI)}</div>
            </CardText>
          )}
        </Card>

        <Card style={{ paddingLeft: "30px" }}>
          <CardHeader
            title="Client Side"
            actAsExpander={true}
            showExpandableButton={true}
          />
          {client && (
            <CardText expandable={true}>
              <div>
                <h1 style={{ padding: "10px 10px 10px 20px" }}>Repo: Client</h1>
              </div>
              <div>{this.rednerAppData(client)}</div>
            </CardText>
          )}
        </Card>
      </div>
    );
  }
}

Layout.propTypes = {
  appInfo: PropTypes.object,
};

export default Layout;
