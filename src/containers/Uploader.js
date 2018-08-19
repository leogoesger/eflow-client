import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import csv from "csvtojson";
import { TextField, DatePicker } from "material-ui";

import upload from "../APIs/upload";
import Layout from "../components/uploader/Layout";
import { getMe } from "../actions/user";
import Styles from "../styles/Styles";

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messsage: "",
      flows: null,
      dates: null,
      start_date: new Date("10/01/2000"),
      name: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  stringProcessor(csvStr) {
    csv({})
      .fromString(csvStr)
      .on("err", err => this.setState({ message: err.toString() }))
      .then(data => {
        const flows = [];
        const dates = [];
        data.forEach(d => {
          flows.push(Number(d.flow));
          dates.push(d.date);
        });
        this.setState({ flows, dates });
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
    const { flows, dates, start_date, name } = this.state;
    await upload.uploadTimeSeries({
      flows,
      dates,
      start_date: `${start_date.getMonth() + 1}/${start_date.getDate()}`,
      name,
    });
    this.props.getMe();
  }

  readFile(fileToRead) {
    const reader = new FileReader();
    reader.readAsText(fileToRead[0]);
    reader.onload = e => this.stringProcessor(e.target.result);
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "600px",
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
        />

        {!this.props.enabled && (
          <div style={{ fontSize: "13px", color: "#e65100" }}>
            Maximum upload reached, please delete existing files before
            uploading more!
          </div>
        )}
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
