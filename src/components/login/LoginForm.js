import React from "react";
import PropTypes from "prop-types";
import { TextField, RaisedButton } from "material-ui";

import Styles from "../../styles/Styles";
import { Colors } from "../../styles";
import {
  getEmailErrorMessage,
  getPasswordErrorMessage,
  navigateTo,
} from "../../utils/helpers";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  _handleChange(value, property) {
    this.setState({
      [property]: value,
    });
  }

  _validateForm() {
    const { email, password } = this.state;
    return Boolean(
      email &&
        password &&
        !getEmailErrorMessage(this.state.email) &&
        !getPasswordErrorMessage(this.state.password)
    );
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <TextField
          className="requiredField"
          value={this.state.email}
          fullWidth={true}
          floatingLabelText="Email"
          errorText={getEmailErrorMessage(this.state.email)}
          errorStyle={{ textAlign: "left" }}
          underlineFocusStyle={Styles.underlineFocusStyle}
          floatingLabelStyle={Styles.floatingLabelStyle}
          floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
          onChange={(_event, value) => this._handleChange(value, "email")}
        />
        <br />
        <TextField
          className="requiredField"
          value={this.state.password}
          type="password"
          fullWidth={true}
          floatingLabelText="Password"
          errorText={getPasswordErrorMessage(this.state.password)}
          errorStyle={{ textAlign: "left" }}
          underlineFocusStyle={Styles.underlineFocusStyle}
          floatingLabelStyle={Styles.floatingLabelStyle}
          floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
          onChange={(_event, value) => this._handleChange(value, "password")}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            onClick={() => navigateTo("/signup")}
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: Colors.gold,
              cursor: "pointer",
              marginTop: "30px",
            }}
          >
            Sign Up
          </div>
          <RaisedButton
            label="Submit"
            backgroundColor={Colors.gold}
            labelColor={Colors.white}
            disabled={!this._validateForm()}
            labelStyle={{ fontSize: "12px" }}
            style={{ marginTop: "20px" }}
            onClick={() => this.props.submitHandler(this.state)}
          />
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  submitHandler: PropTypes.func.isRequired,
};
