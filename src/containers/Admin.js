import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Snackbar, Paper } from "material-ui";

import Layout from "../components/admin/Layout";
import adminActions from "../APIs/admin";
import { navigateTo } from "../utils/helpers";
import { removeUser } from "../actions/user";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackOpen: false,
      message: "",
    };
    this.updateClassMetricHandler = this.updateClassMetricHandler.bind(this);
    this.updateGaugeMetricHandler = this.updateGaugeMetricHandler.bind(this);
    this.broadcastMessageHandler = this.broadcastMessageHandler.bind(this);
    this.uploadFlowDataHandler = this.uploadFlowDataHandler.bind(this);
    this.uploadMetricResultHandler = this.uploadMetricResultHandler.bind(this);
    this.uploadClassHydrographHandler = this.uploadClassHydrographHandler.bind(
      this
    );
    this.uploadGaugeHydrographHandler = this.uploadGaugeHydrographHandler.bind(
      this
    );
    this.uploadFlowConditionHandler = this.uploadFlowConditionHandler.bind(
      this
    );
    this._handleRequestClose = this._handleRequestClose.bind(this);
    this.responseMessage = this.responseMessage.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem("ff_jwt")) {
      this.props.removeUser();
      localStorage.removeItem("ff_jwt");
      navigateTo("/login");
    }
    document.title = "eFlows | Admin";
  }

  responseMessage() {
    return this.setState({
      snackOpen: true,
      message: "Success, wait 1 min before next action!",
    });
  }

  _handleRequestClose() {
    this.setState({ snackOpen: false, message: "" });
  }

  updateClassMetricHandler() {
    adminActions.updateClassMetric().then(this.responseMessage);
  }

  updateGaugeMetricHandler(id) {
    adminActions.updateGaugeMetric(id).then(this.responseMessage);
  }

  broadcastMessageHandler(msg) {
    adminActions.broadcastMessage(msg).then(() => {
      this.setState({
        snackOpen: true,
        message: "Success, wait 1 min before next action!",
      });
    });
  }

  uploadFlowDataHandler() {
    adminActions.uploadFlowData().then(this.responseMessage);
  }

  uploadMetricResultHandler() {
    adminActions.uploadMetricResult().then(this.responseMessage);
  }

  uploadClassHydrographHandler() {
    adminActions.uploadClassHydrograph().then(this.responseMessage);
  }

  uploadGaugeHydrographHandler() {
    adminActions.uploadGaugeHydrograph().then(this.responseMessage);
  }

  uploadFlowConditionHandler() {
    adminActions.uploadFlowCondition().then(this.responseMessage);
  }

  render() {
    return (
      <React.Fragment>
        <div style={styles.banner} />
        <Paper style={styles.paperStyle}>
          <Layout
            updateClassMetric={this.updateClassMetricHandler}
            updateGaugeMetric={this.updateGaugeMetricHandler}
            broadcastMessage={this.broadcastMessageHandler}
            uploadFlowData={this.uploadFlowDataHandler}
            uploadMetricResult={this.uploadMetricResultHandler}
            uploadClassHydrograph={this.uploadClassHydrographHandler}
            uploadGaugeHydrograph={this.uploadGaugeHydrographHandler}
            uploadFlowConditionHandler={this.uploadFlowConditionHandler}
            removeUser={this.props.removeUser}
          />
        </Paper>

        <Snackbar
          open={this.state.snackOpen}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={() => this._handleRequestClose()}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeUser: () => dispatch(removeUser()),
  };
};

Admin.propTypes = {
  currentUser: PropTypes.object,
  removeUser: PropTypes.func,
};

const styles = {
  banner: {
    backgroundColor: "#424242",
    height: "230px",
    zIndex: "0",
  },
  paperStyle: {
    height: "600px",
    margin: "-60px auto 160px auto",
    width: "1000px",
    zIndex: "2",
    overflow: "scroll",
  },
  warningIcon: { color: "#616161", height: "60px", width: "60px" },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
