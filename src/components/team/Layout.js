import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';

import MemberCard from './MemberCard';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedMember: null,
    };
  }

  handleOpen(member) {
    this.setState({open: true, selectedMember: member});
  }

  handleClose() {
    this.setState({open: false, selectedMember: null});
  }

  _renderMembers(members) {
    return members.map((member, index) => {
      return (
        <div
          key={member.name}
          className="row col-lg-3 col-md-3 col-sm-3 col-xs-12"
          style={{
            marginLeft: '0px',
            marginRight: '0px',
            marginBottom: '30px',
          }}
        >
          <Card
            style={{cursor: 'pointer'}}
            onClick={() => this.handleOpen(members[index])}
          >
            <CardMedia overlay={<CardTitle subtitle={member.name} />}>
              <img src={member.image} alt="" />
            </CardMedia>
          </Card>
        </div>
      );
    });
  }

  render() {
    if (!this.props.members) {
      return <div style={{height: '600px'}} />;
    }
    return (
      <div className="row col-lg-8 col-md-8" style={{margin: '120px auto'}}>
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
