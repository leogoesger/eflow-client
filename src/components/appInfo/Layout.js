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

  render() {
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
          {this.props.appInfo.apiEnv && (
            <CardText expandable={true}>
              <div>
                <h1 style={{ padding: "10px 10px 10px 20px" }}>
                  Version: {this.props.appInfo.apiEnv.version}
                </h1>
              </div>
              <Divider />
              <div>
                {this.props.appInfo.apiEnv.commit.map((commit, indx) => {
                  return (
                    <Card key={indx}>
                      <CardHeader
                        title={`Commit Message: ${commit.subject}`}
                        subtitle={`Commit Date: ${commit.authorDateRel}`}
                        actAsExpander={true}
                        showExpandableButton={true}
                      />
                      <CardText expandable={true}>
                        <h1 style={{ padding: "10px 10px 10px 20px" }}>
                          Author: {commit.authorName}
                        </h1>
                        <List>
                          {commit.files.map((file, inx) => {
                            return (
                              <ListItem
                                key={inx}
                                primaryText={file}
                                leftIcon={<Merge />}
                              />
                            );
                          })}
                        </List>
                      </CardText>
                    </Card>
                  );
                })}
              </div>
            </CardText>
          )}
        </Card>
        <Card style={{ paddingLeft: "30px" }}>
          <CardHeader
            title="Client Side"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <div>
              <h1 style={{ padding: "10px 10px 10px 20px" }}>
                Version: {process.env.npm_package_version}
              </h1>
            </div>
          </CardText>
        </Card>
      </div>
    );
  }
}

Layout.propTypes = {
  appInfo: PropTypes.object,
};

export default Layout;
