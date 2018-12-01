import React from "react";
import PropTypes from "prop-types";
import { RaisedButton, Dialog, FlatButton } from "material-ui";
import { Colors } from "../../styles";

import ParamsSliders from "./ParamsSliders";

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
    this.props.setUserParams(this.state.params);
    this.setState({ open: false });
  }

  // handleSlider(event, value, season, param) {
  //   const tmpState = { ...this.state.params };
  //   tmpState[season][param] = value;
  //   this.setState({ params: tmpState });
  // }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        key="0"
        primary={true}
        onClick={() => this.handleClose()}
      />,
      <FlatButton
        label="Submit"
        key="1"
        primary={true}
        onClick={() => this.handleSubmit()}
      />,
    ];

    return (
      <React.Fragment>
        <RaisedButton
          label="Params (Optional)"
          backgroundColor={Colors.grey}
          labelColor={Colors.white}
          labelStyle={{ fontSize: "12px" }}
          onClick={() => this.handleOpen()}
          style={{ margin: "20px 10px" }}
        />
        <Dialog
          title="Set Params (optional)"
          actions={actions}
          modal={true}
          open={this.state.open}
          style={{ margin: "auto" }}
          autoScrollBodyContent={true}
        >
          <ParamsSliders
            params={this.props.userParams}
            handleSlider={this.props.handleSlider}
          />
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
