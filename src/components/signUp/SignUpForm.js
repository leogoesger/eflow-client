import React from "react";
import PropTypes from "prop-types";
import { TextField, RaisedButton } from "material-ui";

import Styles from "../../styles/Styles";
import { Colors } from "../../styles";
import {
  getEmailErrorMessage,
  getPasswordErrorMessage,
  navigateTo,
  getNameErrorMessage,
} from "../../utils/helpers";

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordR: "",
    };
  }

  _turnUpperCase(name, property) {
    if (name && name !== this.state.name) {
      const upperName = name.charAt(0).toUpperCase() + name.slice(1);
      this.setState({ [property]: upperName });
    } else {
      this.setState({ [property]: "" });
    }
  }

  _handleChange(value, property) {
    if (property === "firstName" || property === "lastName") {
      return this._turnUpperCase(value, property);
    }
    this.setState({
      [property]: value,
    });
  }

  _validatePasswords() {
    const { password, passwordR } = this.state;
    return password === passwordR;
  }

  _validateForm() {
    const { firstName, lastName, email, password, passwordR } = this.state;
    return Boolean(
      firstName &&
        lastName &&
        email &&
        password &&
        passwordR &&
        !getEmailErrorMessage(this.state.email) &&
        !getPasswordErrorMessage(this.state.password) &&
        this._validatePasswords()
    );
  }

  render() {
    const { firstName, lastName, email, password, passwordR } = this.state;

    return (
      <div
        style={{
          width: "100%",
          overflow: "scroll",
          height: "400px",
          margin: "20px auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            className="requiredField"
            value={firstName}
            style={{ width: "45%" }}
            floatingLabelText="First Name"
            errorText={getNameErrorMessage(firstName)}
            errorStyle={{ textAlign: "left" }}
            underlineFocusStyle={Styles.underlineFocusStyle}
            floatingLabelStyle={Styles.floatingLabelStyle}
            floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
            onChange={(_event, value) => this._handleChange(value, "firstName")}
          />
          <TextField
            className="requiredField"
            value={lastName}
            style={{ width: "45%" }}
            floatingLabelText="Last Name"
            errorText={getNameErrorMessage(lastName)}
            errorStyle={{ textAlign: "left" }}
            underlineFocusStyle={Styles.underlineFocusStyle}
            floatingLabelStyle={Styles.floatingLabelStyle}
            floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
            onChange={(_event, value) => this._handleChange(value, "lastName")}
          />
        </div>

        <br />
        <TextField
          className="requiredField"
          value={email}
          fullWidth={true}
          floatingLabelText="Email"
          errorText={getEmailErrorMessage(email)}
          errorStyle={{ textAlign: "left" }}
          underlineFocusStyle={Styles.underlineFocusStyle}
          floatingLabelStyle={Styles.floatingLabelStyle}
          floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
          onChange={(_event, value) => this._handleChange(value, "email")}
        />
        <br />
        <TextField
          className="requiredField"
          value={password}
          type="password"
          fullWidth={true}
          floatingLabelText="Password"
          errorText={getPasswordErrorMessage(password)}
          errorStyle={{ textAlign: "left" }}
          underlineFocusStyle={Styles.underlineFocusStyle}
          floatingLabelStyle={Styles.floatingLabelStyle}
          floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
          onChange={(_event, value) => this._handleChange(value, "password")}
        />
        <br />
        <TextField
          className="requiredField"
          value={passwordR}
          type="password"
          fullWidth={true}
          floatingLabelText="Repeat Your Password"
          errorText={getPasswordErrorMessage(passwordR)}
          errorStyle={{ textAlign: "left" }}
          underlineFocusStyle={Styles.underlineFocusStyle}
          floatingLabelStyle={Styles.floatingLabelStyle}
          floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
          onChange={(_event, value) => this._handleChange(value, "passwordR")}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            onClick={() => navigateTo("/login")}
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: Colors.gold,
              cursor: "pointer",
              marginTop: "30px",
            }}
          >
            Log In
          </div>
          <RaisedButton
            label="Submit"
            backgroundColor={Colors.gold}
            labelColor={Colors.white}
            disabled={!this._validateForm()}
            labelStyle={{ fontSize: "12px" }}
            style={{
              marginTop: "20px",
            }}
            onClick={() =>
              this.props.submitHandler({ firstName, lastName, email, password })
            }
          />
        </div>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  submitHandler: PropTypes.func.isRequired,
};
