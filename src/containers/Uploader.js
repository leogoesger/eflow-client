import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import csv from 'csvtojson';
import { TextField, DatePicker, Snackbar } from 'material-ui';

import upload from '../APIs/upload';
import Layout from '../components/uploader/Layout';
import { getMe } from '../actions/user';
import Styles from '../styles/Styles';
import Loader from '../components/shared/loader/Loader';

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      flows: null,
      dates: null,
      start_date: new Date('10/01/2000'),
      name: '',
      loading: false,
      isError: false,
    };
    this.reader = new FileReader();
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  stringProcessor(csvStr) {
    csv({})
      .fromString(csvStr)
      .on('err', err => this.setState({ message: err.toString() }))
      .then(data => {
        const dataTypes = Object.keys(data[0]);
        if (!('flow' in data[0]) || !('date' in data[0])) {
          return this.setState({
            isError: true,
            message: `Invalid Data Types: ${dataTypes[0]} or ${dataTypes[1]}`,
          });
        }

        const flows = [];
        const dates = [];
        data.forEach(d => {
          flows.push(Number(d.flow));
          dates.push(d.date);
        });
        this.setState({ flows, dates, isError: false });
      });
  }

  handleChangeDate(e, date) {
    this.setState({
      start_date: date,
    });
  }

  isEnabled() {
    const { flows, dates, start_date, name } = this.state;
    return Boolean(flows && dates && start_date && name && this.props.enabled);
  }

  async onSubmit() {
    this.setState({ loading: true });
    const { flows, dates, start_date, name } = this.state;
    if (flows.length !== dates.length) {
      return this.setState({
        flows: [],
        dates: [],
        message: "Length of flow and date's arrays are not equal",
      });
    }
    try {
      await upload.uploadTimeSeries({
        flows,
        dates,
        start_date: `${start_date.getMonth() + 1}/${start_date.getDate()}`,
        name,
      });

      this.props.getMe();
      this.setState({ loading: false });
    } catch (error) {
      this.setState({
        loading: false,
        isError: true,
        message: `Could not process data`,
      });
    }
  }

  readFile(fileToRead) {
    this.reader.readAsText(fileToRead[0]);
    this.reader.onload = e => this.stringProcessor(e.target.result);
  }

  render() {
    return (
      <div>
        <Loader loading={this.state.loading} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '600px',
          }}
        >
          <DatePicker
            onChange={this.handleChangeDate}
            floatingLabelText="Water Year Start Date"
            defaultDate={this.state.start_date}
            disableYearSelection={true}
            formatDate={d => `${d.getMonth() + 1}/${d.getDate()}`}
          />
          <TextField
            hintText="Yuba R BL Englebright"
            value={this.state.name}
            floatingLabelText="Name your uploaded data"
            underlineFocusStyle={Styles.underlineFocusStyle}
            floatingLabelStyle={Styles.floatingLabelStyle}
            floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
            onChange={(_event, value) => this.setState({ name: value })}
          />
        </div>

        <Layout
          onUpload={files => this.readFile(files)}
          onSubmit={this.onSubmit}
          getMe={this.props.getMe}
          enabled={this.isEnabled()}
          isError={this.state.isError}
        />

        {!this.props.enabled && (
          <div style={{ fontSize: '13px', color: '#e65100' }}>
            Maximum upload reached, please delete existing files before
            uploading more!
          </div>
        )}

        <Snackbar
          open={Boolean(this.state.message)}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={() => this.setState({ message: '' })}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMe: () => dispatch(getMe()),
  };
};

Uploader.propTypes = {
  uploadResorts: PropTypes.func,
  getMe: PropTypes.func,
  enabled: PropTypes.bool,
};

export default connect(
  null,
  mapDispatchToProps
)(Uploader);
