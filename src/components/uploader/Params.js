import React from "react";
import PropTypes from "prop-types";
import {
  RaisedButton,
  Dialog,
  FlatButton,
  // Divider,
  SelectField,
  MenuItem,
} from "material-ui";

import Styles from "../../styles/Styles";
// import ParamsSliders from "./ParamsSliders";
import { classification } from "../../constants/classification";
import { classParms } from "../../constants/params";

class Params extends React.Component {
  constructor(props) {
    super(props);
    this.state = { class: "Low-volume snowmelt and rain" };
  }

  _handleChange(v) {
    this.setState({ class: classification[v] });
    this.props.setUserParams(classParms[classification[v]]);
  }

  render() {
    return (
      <Dialog
        modal={false}
        open={this.props.open}
        style={{ margin: "auto", paddingTop: "0px" }}
        onRequestClose={() => this.props.handleDialog(false)}
        autoScrollBodyContent={true}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "6px",
          }}
        >
          <div style={{ fontSize: "22px", fontWeight: 600 }}>
            Select / Set Parameters <br />
            <span style={{ fontSize: "12px", color: "#d32f2f" }}>
              Optional: Select a stream class to refine metric results
            </span>
          </div>

          <SelectField
            floatingLabelText="Set Parameters Based on Stream Class"
            style={{ marginTop: "-24px", width: "285px" }}
            value={this.props.predictedClass || this.state.class}
            underlineFocusStyle={Styles.underlineFocusStyle}
            floatingLabelStyle={Styles.floatingLabelStyle}
            floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
            onChange={(_event, value) => {
              this._handleChange(value);
              this.props.onClassSelect(value);
            }}
          >
            {classification.map((c) => (
              <MenuItem value={c} primaryText={c} key={c} />
            ))}
          </SelectField>
        </div>

        {/* <Divider /> */}
        {/* 
        <ParamsSliders
          params={this.props.userParams}
          handleSlider={this.props.handleSlider}
        /> */}
        {/* <Divider /> */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          {/* <FlatButton
            label="Reset to Default"
            key="0"
            primary={true}
            onClick={() => this.props.setUserParams()}
          /> */}
          <div style={{ display: "flex" }}>
            <FlatButton
              label="Cancel"
              key="1"
              primary={true}
              onClick={() => this.props.handleDialog(false)}
            />
            <RaisedButton
              label={this.props.reCalc ? "Recalculate" : "Save"}
              style={{ marginLeft: "10px" }}
              key="2"
              primary={true}
              onClick={
                this.props.reCalc
                  ? () => this.props.onSubmit()
                  : () => this.props.handleDialog(false)
              }
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

Params.propTypes = {
  userParams: PropTypes.object,
  setUserParams: PropTypes.func,
  handleSlider: PropTypes.func,
  open: PropTypes.bool,
  handleDialog: PropTypes.func,
  predictedClass: PropTypes.string,
  reCalc: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClassSelect: PropTypes.func,
};

export default Params;
