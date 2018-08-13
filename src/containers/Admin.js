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
  }

  componentDidMount() {
    if (!localStorage.getItem("ff_jwt")) {
      this.props.removeUser();
      localStorage.removeItem("ff_jwt");
      navigateTo("/login");
    }
    document.title = "Eflows | Admin";
  }

  updateClassMetricHandler() {
    adminActions.updateClassMetric().then(() =>
      this.setState({
        snackOpen: true,
        message: "Success, wait 1 min before next action!",
      })
    );
  }

  updateGaugeMetricHandler(id) {
    adminActions.updateGaugeMetric(id).then(() =>
      this.setState({
        snackOpen: true,
        message: "Success, wait 1 min before next action!",
      })
    );
  }

  broadcastMessageHandler(msg) {
    adminActions.broadcastMessage(msg).then(() =>
      this.setState({
        snackOpen: true,
        message: "Success, wait 1 min before next action!",
      })
    );
  }

  uploadFlowDataHandler() {
    adminActions.uploadFlowData().then(() =>
      this.setState({
        snackOpen: true,
        message: "Success, wait 1 min before next action!",
      })
    );
  }

  uploadMetricResultHandler() {
    adminActions.uploadMetricResult().then(() =>
      this.setState({
        snackOpen: true,
        message: "Success, wait 1 min before next action!",
      })
    );
  }

  uploadClassHydrographHandler() {
    adminActions.uploadClassHydrograph().then(() =>
      this.setState({
        snackOpen: true,
        message: "Success, wait 1 min before next action!",
      })
    );
  }

  uploadGaugeHydrographHandler() {
    adminActions.uploadGaugeHydrograph().then(() =>
      this.setState({
        snackOpen: true,
        message: "Success, wait 1 min before next action!",
      })
    );
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
