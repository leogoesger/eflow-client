import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton, Dialog, FlatButton, Divider } from 'material-ui';
import { Colors } from '../../styles';

import ParamsSliders from './ParamsSliders';

class Params extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSubmit() {
    this.setState({ open: false });
  }

  // handleSlider(event, value, season, param) {
  //   const tmpState = { ...this.state.params };
  //   tmpState[season][param] = value;
  //   this.setState({ params: tmpState });
  // }

  render() {
    return (
      <React.Fragment>
        <RaisedButton
          label="Params (Optional)"
          backgroundColor={Colors.grey}
          labelColor={Colors.white}
          labelStyle={{ fontSize: '12px' }}
          onClick={() => this.handleOpen()}
          style={{ margin: '20px 10px' }}
        />
        <Dialog
          title="Set Params (optional)"
          modal={true}
          open={this.state.open}
          style={{ margin: 'auto' }}
          autoScrollBodyContent={true}
        >
          <ParamsSliders
            params={this.props.userParams}
            handleSlider={this.props.handleSlider}
          />
          <Divider />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <FlatButton
              label="Reset to Default"
              key="0"
              primary={true}
              onClick={() => this.props.setUserParams()}
            />
            <div style={{ display: 'flex' }}>
              <FlatButton
                label="Cancel"
                key="1"
                primary={true}
                onClick={() => this.handleClose()}
              />
              <RaisedButton
                label="Save"
                style={{ marginLeft: '10px' }}
                key="2"
                primary={true}
                onClick={() => this.handleSubmit()}
              />
            </div>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

Params.propTypes = {
  userParams: PropTypes.object,
  setUserParams: PropTypes.func,
  handleSlider: PropTypes.func,
};

export default Params;
