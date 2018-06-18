import React from "react";
import PropTypes from "prop-types";
import { Card, CardMedia, CardTitle } from "material-ui/Card";
import Dialog from "material-ui/Dialog";

import MemberCard from "./MemberCard";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedMember: null,
    };
  }

  handleOpen(member) {
    this.setState({ open: true, selectedMember: member });
  }

  handleClose() {
    this.setState({ open: false, selectedMember: null });
  }

  _renderMembers(members) {
    return members.map((member, index) => {
      return (
        <div
          key={member.name}
          style={{
            marginLeft: "15px",
            marginRight: "15px",
            marginBottom: "30px",
            height: "100%",
            width: "220px",
          }}
        >
          <Card
            style={{ cursor: "pointer" }}
            onClick={() => this.handleOpen(members[index])}
          >
            <CardMedia
              overlay={
                <CardTitle
                  style={{ paddingTop: "0px", paddingBottom: "12px" }}
                  title={member.name}
                  subtitle={member.title}
                  titleStyle={{ fontSize: "14px", color: "#eeeeee" }}
                  subtitleStyle={{ fontSize: "12px", color: "#e0e0e0" }}
                />
              }
            >
              <img src={member.image} alt="" />
            </CardMedia>
          </Card>
        </div>
      );
    });
  }

  render() {
    if (!this.props.members) {
      return <div style={{ height: "600px" }} />;
    }
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "120px auto",
          width: "1000px",
        }}
      >
        {this._renderMembers(this.props.members)}
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={() => this.handleClose()}
        >
          <MemberCard member={this.state.selectedMember} />
        </Dialog>
      </div>
    );
  }
}

Layout.propTypes = {
  members: PropTypes.array,
};
