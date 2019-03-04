import React from 'react';
import PropTypes from 'prop-types';
import {
  RaisedButton,
  Dialog,
  FlatButton,
  Divider,
  SelectField,
  MenuItem,
} from 'material-ui';
import { Colors } from '../../styles';
import Tune from 'material-ui/svg-icons/image/tune';

import Styles from '../../styles/Styles';
import ParamsSliders from './ParamsSliders';
import { classification } from '../../constants/classification';
import { classParms } from '../../constants/params';

class Params extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, class: '' };
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

  _handleChange(v) {
    this.setState({ class: classification[v] });
    this.props.setUserParams(classParms[classification[v]]);
  }

  render() {
    return (
      <React.Fragment>
        <FlatButton
          label="Params (Optional)"
          icon={
            <Tune
              style={{ width: '30px', height: '30px' }}
              color={Colors.gold}
            />
          }
          labelStyle={{ fontSize: '12px', fontWeight: '700' }}
          onClick={() => this.handleOpen()}
          //style={{ margin: '20px 10px' }}
          disabled={!this.props.enabled}
        />

        <Dialog
          modal={false}
          open={this.state.open}
          style={{ margin: 'auto', paddingTop: '0px' }}
          onRequestClose={() => this.handleClose()}
          autoScrollBodyContent={true}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: '6px',
            }}
          >
            <div style={{ fontSize: '22px', fontWeight: 600 }}>
              Select / Set Parameters <br />
              <span style={{ fontSize: '12px', color: '#d32f2f' }}>
                Optional: Select a stream class to refine metric results
              </span>
            </div>

            <SelectField
              floatingLabelText="Set Parameters Based on Stream Class"
              style={{ marginTop: '-24px' }}
              value={this.state.class}
              underlineFocusStyle={Styles.underlineFocusStyle}
              floatingLabelStyle={Styles.floatingLabelStyle}
              floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
              onChange={(_event, value) => this._handleChange(value)}
            >
              {classification.map(c => (
                <MenuItem value={c} primaryText={c} key={c} />
              ))}
            </SelectField>
          </div>

          <Divider />

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
  enabled: PropTypes.bool,
};

export default Params;
