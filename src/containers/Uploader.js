import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import csv from "csvtojson";
import { cloneDeep } from "lodash";
import { TextField, DatePicker, Snackbar } from "material-ui";

import upload from "../APIs/upload";
import Layout from "../components/uploader/Layout";
import { getMe } from "../actions/user";
import Styles from "../styles/Styles";
import Loader from "../components/shared/loader/Loader";
import { params } from "../constants/params";
import { Colors } from "../styles";

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      flows: null,
      dates: null,
      class_num: "3",
      start_date: new Date("10/01/2000"),
      name: "",
      fileName: "",
      userParams: JSON.parse(JSON.stringify(params)),
      loading: false,
      isError: false,
      location: "",
      riverName: "",
    };
    this.reader = new FileReader();
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  stringProcessor(csvStr) {
    csv({})
      .fromString(csvStr)
      .on("err", (err) => this.setState({ message: err.toString() }))
      .then((data) => {
        const dataTypes = Object.keys(data[0]);
        if (!("flow" in data[0]) || !("date" in data[0])) {
          return this.setState({
            isError: true,
            message: `Invalid Data Types: ${dataTypes[0]} or ${dataTypes[1]}`,
          });
        }

        const flows = [];
        const dates = [];
        for (let d of data) {
          if (!Number.isNaN(d.flow) && !d.date) {
            return this.setState({
              isError: true,
              flows: [],
              dates: [],
              message: `Invalid Data Types: Some rows are missing date value`,
            });
          } else if (!d.flow.trim() && d.date) {
            return this.setState({
              isError: true,
              flows: [],
              dates: [],
              message: `Invalid Data Types: Some rows are missing flow value`,
            });
          }

          flows.push(Number(d.flow));
          dates.push(d.date);
        }
        this.setState({ flows, dates, isError: false });
      });
  }

  handleChangeDate(e, date) {
    this.setState({
      start_date: date,
    });
  }

  isEnabled() {
    const { flows, dates, start_date, name, isError } = this.state;
    return Boolean(
      flows && dates && start_date && name && this.props.enabled && !isError
    );
  }

  async onSubmit() {
    this.setState({ loading: true });
    const {
      flows,
      dates,
      start_date,
      name,
      userParams,
      location,
      riverName,
    } = this.state;

    const tmpUserParams = cloneDeep(userParams);

    const {
      max_zero_allowed_per_year,
      max_nan_allowed_per_year,
    } = tmpUserParams["winter_params"];

    delete tmpUserParams["winter_params"];

    tmpUserParams["winter_params"] = {
      max_zero_allowed_per_year,
      max_nan_allowed_per_year,
    };

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
        class_num: this.state.class_num,
        params: { ...tmpUserParams },
        location,
        riverName,
      });

      this.props.getPagedUserUploads(null);
      this.setState({
        userParams: JSON.parse(JSON.stringify(params)),
        loading: false,
        fileName: "",
        name: "",
      });
    } catch (error) {
      this.setState({
        loading: false,
        isError: true,
        fileName: "",
        message: `Could not process data`,
      });
    }
  }

  readFile(fileToRead) {
    if (fileToRead.length) {
      const fileName =
        fileToRead[0].name.length > 20
          ? fileToRead[0].name.slice(0, 20).concat("...")
          : fileToRead[0].name;
      this.setState({ fileName });
      this.reader.readAsText(fileToRead[0]);
      this.reader.onload = (e) => this.stringProcessor(e.target.result);
    }
  }

  setUserParams(userParams) {
    if (!userParams) {
      return this.setState({ userParams: JSON.parse(JSON.stringify(params)) });
    }
    return this.setState({ userParams });
  }

  handleSlider(event, value, season, param) {
    const tmpState = { ...this.state.userParams };
    tmpState[season][param] = value;
    this.setState({ userParams: tmpState });
  }

  render() {
    return (
      <React.Fragment>
        <Loader loading={this.state.loading} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "96%",
            marginLeft: "50px",
            marginBottom: "10px",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <DatePicker
              onChange={this.handleChangeDate}
              floatingLabelText="Water Year Start Date"
              // textFieldStyle={{ width: '156px' }}
              defaultDate={this.state.start_date}
              style={{ marginRight: "10px" }}
              disableYearSelection={true}
              formatDate={(d) => `${d.getMonth() + 1}/${d.getDate()}`}
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              hintText="Yuba River"
              value={this.state.riverName}
              errorText={
                this.state.riverName.length > 30
                  ? `${this.state.riverName.length}/75`
                  : null
              }
              style={{ marginRight: "10px" }}
              errorStyle={{ color: Colors.gold, float: "right" }}
              disabled={this.state.riverName.length > 74}
              floatingLabelText="River Name (optional)"
              underlineFocusStyle={Styles.underlineFocusStyle}
              floatingLabelStyle={Styles.floatingLabelStyle}
              floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
              onChange={(_event, value) => this.setState({ riverName: value })}
            />
            <TextField
              hintText="Station Name OR coordinates"
              value={this.state.location}
              errorText={
                this.state.location.length > 30
                  ? `${this.state.location.length}/75`
                  : null
              }
              errorStyle={{ color: Colors.gold, float: "right" }}
              disabled={this.state.location.length > 74}
              floatingLabelText="Location (optional)"
              underlineFocusStyle={Styles.underlineFocusStyle}
              floatingLabelStyle={Styles.floatingLabelStyle}
              floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
              onChange={(_event, value) => this.setState({ location: value })}
            />
          </div>

          <Layout
            onUpload={(files) => this.readFile(files)}
            onSubmit={this.onSubmit}
            onClassSelect={(c) => this.setState({ class_num: c })}
            getMe={this.props.getMe}
            enabled={this.isEnabled()}
            isError={this.state.isError}
            userParams={this.state.userParams}
            setUserParams={(p) => this.setUserParams(p)}
            handleSlider={(e, value, season, param) =>
              this.handleSlider(e, value, season, param)
            }
            fileName={this.state.fileName}
          />

          {!this.props.enabled && (
            <div style={{ fontSize: "13px", color: "#e65100" }}>
              Maximum upload reached, please delete existing files before
              uploading more!
            </div>
          )}

          <Snackbar
            open={Boolean(this.state.message)}
            message={this.state.message}
            autoHideDuration={4000}
            onRequestClose={() => this.setState({ message: "" })}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMe: () => dispatch(getMe()),
  };
};

Uploader.propTypes = {
  getPagedUserUploads: PropTypes.func,
  getMe: PropTypes.func,
  enabled: PropTypes.bool,
};

export default connect(null, mapDispatchToProps)(Uploader);
