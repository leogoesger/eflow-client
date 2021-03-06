import React from "react";
import PropTypes from "prop-types";
import { Divider, TextField, SelectField, MenuItem } from "material-ui";

import Styles from "../../styles/Styles";
import AdminActionBtn from "./AdminActionBtn";
import { navigateTo } from "../../utils/helpers";

class AWSUploads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Sorry, we are updating the website for the next 2 mins!",
      classId: 1,
    };
    this.updateGaugeMetricHandler = this.updateGaugeMetricHandler.bind(this);
    this.broadcastMessageHandler = this.broadcastMessageHandler.bind(this);
  }

  _handleChange(v, field) {
    if (field === "classId") {
      return this.setState({ [field]: v + 1 });
    }
    return this.setState({ [field]: v });
  }

  logoutUser() {
    localStorage.removeItem("ff_jwt");
    this.props.removeUser();
    navigateTo("/");
  }

  updateGaugeMetricHandler() {
    this.props.updateGaugeMetric(this.state.classId);
  }

  broadcastMessageHandler() {
    this.props.broadcastMessage(this.state.message);
  }

  render() {
    const {
      updateClassMetric,
      uploadFlowData,
      uploadMetricResult,
      uploadClassHydrograph,
      uploadGaugeHydrograph,
      uploadFlowConditionHandler,
    } = this.props;
    return (
      <div>
        <div style={{ padding: "40px 20px" }}>
          <h1>Upload Data to DB</h1>
          <div style={{ padding: "15px" }}>
            <AdminActionBtn
              action={uploadMetricResult}
              displayName="Upload Metric Result"
            />
            <AdminActionBtn
              action={uploadClassHydrograph}
              displayName="Upload Class Hydrograph"
            />

            <AdminActionBtn
              action={uploadGaugeHydrograph}
              displayName="Upload Gauge Hydrograph"
            />
            <AdminActionBtn
              action={uploadFlowData}
              displayName="Upload Flow Data"
            />
            <AdminActionBtn
              action={uploadFlowConditionHandler}
              displayName="Upload Flow Condition"
            />
          </div>
        </div>
        <Divider />

        <div style={{ padding: "40px 20px" }}>
          <h1>Update Metrics</h1>
          <div style={{ padding: "5px" }}>
            <div style={{ display: "flex" }}>
              <SelectField
                floatingLabelText="Select Class To Update"
                value={this.state.classId}
                style={{ marginTop: "10px" }}
                onChange={(_event, value) =>
                  this._handleChange(value, "classId")
                }
              >
                <MenuItem value={1} primaryText="1" />
                <MenuItem value={2} primaryText="2" />
                <MenuItem value={3} primaryText="3" />
                <MenuItem value={4} primaryText="4" />
                <MenuItem value={5} primaryText="5" />
                <MenuItem value={6} primaryText="6" />
                <MenuItem value={7} primaryText="7" />
                <MenuItem value={8} primaryText="8" />
                <MenuItem value={9} primaryText="9" />
              </SelectField>
              <div style={{ margin: "40px 20px 0px 20px" }}>
                <AdminActionBtn
                  action={() => this.updateGaugeMetricHandler()}
                  displayName="Update Gauge Metric"
                />
              </div>
              <div
                style={{
                  fontSize: "32px",
                  color: "#9e9e9e",
                  marginTop: "42px",
                }}
              >
                {" | "}
              </div>
              <div style={{ margin: "40px 20px 0px 20px" }}>
                <AdminActionBtn
                  action={updateClassMetric}
                  displayName="Update Class Metric"
                />
              </div>
            </div>
          </div>
        </div>
        <Divider />

        <div style={{ padding: "40px 20px" }}>
          <h1>Broadcast Message</h1>
          <div style={{ padding: "5px" }}>
            <TextField
              hintText="Enter Message"
              value={this.state.message}
              floatingLabelText="Enter Message"
              underlineFocusStyle={Styles.underlineFocusStyle}
              floatingLabelStyle={Styles.floatingLabelStyle}
              floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
              onChange={(_event, value) => this._handleChange(value, "message")}
            />
            <AdminActionBtn
              action={() => this.broadcastMessageHandler(this.state.message)}
              displayName="Broadcast Message"
            />
          </div>
        </div>
      </div>
    );
  }
}

AWSUploads.propTypes = {
  updateClassMetric: PropTypes.func,
  updateGaugeMetric: PropTypes.func,
  broadcastMessage: PropTypes.func,
  uploadFlowData: PropTypes.func,
  uploadMetricResult: PropTypes.func,
  uploadClassHydrograph: PropTypes.func,
  uploadGaugeHydrograph: PropTypes.func,
  removeUser: PropTypes.func,
  uploadFlowConditionHandler: PropTypes.func,
};

export default AWSUploads;
