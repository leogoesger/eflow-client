import React from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';

import BillGates from '../../constants/billgates.jpg';

export default class Layout extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  _renderMembers() {
    const members = [
      {
        name: 'Noelle Patterson',
        degree: 'Master In Progress',
        specital: 'Something',
        imgUrl: '',
      },
      {
        name: 'Noelle Patterson1',
        degree: 'Master In Progress',
        specital: 'Something',
        imgUrl: '',
      },
      {
        name: 'Noelle Patterson2',
        degree: 'Master In Progress',
        specital: 'Something',
        imgUrl: '',
      },
      {
        name: 'Noelle Patterson3',
        degree: 'Master In Progress',
        specital: 'Something',
        imgUrl: '',
      },
      {
        name: 'Noelle Patterson4',
        degree: 'Master In Progress',
        specital: 'Something',
        imgUrl: '',
      },
      {
        name: 'Noelle Patterson5',
        degree: 'Master In Progress',
        specital: 'Something',
        imgUrl: '',
      },
      {
        name: 'Noelle Patterson6',
        degree: 'Master In Progress',
        specital: 'Something',
        imgUrl: '',
      },
    ];
    return members.map(member => {
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
          <Card style={{ cursor: 'pointer' }} onClick={() => this.handleOpen()}>
            <CardMedia overlay={<CardTitle subtitle={member.name} />}>
              <img src={BillGates} alt="" />
            </CardMedia>
          </Card>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="row col-lg-10 col-md-10" style={{ margin: '120px auto' }}>
        {this._renderMembers()}
        <Dialog
          title="Dialog With Actions"
          modal={false}
          open={this.state.open}
          onRequestClose={() => this.handleClose()}
        >
          The actions in this window were passed in as an array of React
          objects.
        </Dialog>
      </div>
    );
  }
}
