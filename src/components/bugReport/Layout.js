import React from 'react';
import PropTypes from 'prop-types';

import {getEmailErrorMessage} from '../../utils/helpers';
import TextField from 'material-ui/TextField';
import {CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Styles from '../../styles/Styles';
import {Colors} from '../../styles';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      msg: '',
      focused: false,
    };
  }

  _handleChange(value, property) {
    this.setState({
      [property]: value,
    });
  }

  _validateForm() {
    return Boolean(
      !this.state.name ||
        !this.state.msg ||
        getEmailErrorMessage(this.state.email)
    );
  }

  _submitBugReport() {
    this.props.submitBugReport({
      name: this.state.name,
      email: this.state.email,
      msg: this.state.msg,
    });
    this.setState({name: '', email: '', msg: '', focused: false});
  }

  render() {
    return (
      <div style={styles.containerStyle}>
        <CardHeader
          title={'Bug Report'}
          subtitle={
            'Submit the bug report, and we will get back to you shortly!'
          }
          titleStyle={{fontSize: '26px', color: Colors.gold}}
          subtitleStyle={{fontSize: '16px', marginTop: '5px'}}
          style={{padding: '30px 0px'}}
          actAsExpander={false}
          showExpandableButton={false}
        />
        <TextField
          className="requiredField"
          hintText="John Doe"
          onFocus={() => this.setState({focused: true})}
          value={this.state.name}
          fullWidth={true}
          floatingLabelText="Name"
          underlineFocusStyle={Styles.underlineFocusStyle}
          floatingLabelStyle={Styles.floatingLabelStyle}
          floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
          onChange={(_event, value) => this._handleChange(value, 'name')}
        />
        <br />
        <TextField
          className="requiredField"
          value={this.state.email}
          fullWidth={true}
          hintText="john@gmail.com"
          floatingLabelText="Email"
          errorText={getEmailErrorMessage(this.state.email)}
          errorStyle={{textAlign: 'left'}}
          underlineFocusStyle={Styles.underlineFocusStyle}
          floatingLabelStyle={Styles.floatingLabelStyle}
          floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
          onChange={(_event, value) => this._handleChange(value, 'email')}
        />
        <br />
        <TextField
          className="requiredField"
          value={this.state.msg}
          fullWidth={true}
          floatingLabelText="Message"
          hintText="Please provide a detailed message to help easily track the bug. Thank you!"
          underlineFocusStyle={Styles.underlineFocusStyle}
          floatingLabelStyle={Styles.floatingLabelStyle}
          floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
          multiLine={true}
          rows={5}
          onChange={(_event, value) => this._handleChange(value, 'msg')}
        />
        <br />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '10px',
          }}
        >
          <RaisedButton
            label="Submit"
            backgroundColor={Colors.gold}
            labelColor={Colors.white}
            disabled={this._validateForm()}
            labelStyle={{fontSize: '12px'}}
            onClick={() => this._submitBugReport()}
          />
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  submitBugReport: PropTypes.func,
};

const styles = {
  containerStyle: {
    width: '50%',
    margin: '0 auto',
    paddingTop: '30px',
  },
};
