import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import io from "socket.io-client";

const socket = io(process.env.SERVER_ADDRESS);

import Layout from "../components/shared/header/Layout";
import { isBrowserNotSupported } from "../utils/helpers";
import MetricGaugeDrawer from "../components/metricDetail/MetricGaugeDrawer";
import { fetchReleaseNotes } from "../actions/releaseNote";
import {
  toggleMetricGaugeDrawer,
  toggleAnnualFlowMetrics,
  handleToggleLogScale,
  handleHydrographOverlay,
  handleFixedYaxis,
  getYaxisMax,
} from "../actions/metricDetail";
import { fetchCurrentGauge } from "../actions/gauge";
import { fetchBroadCastMessage, getMe, removeUser } from "../actions/user";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
    };
  }

  componentWillMount() {
    this.props.fetchReleaseNotes();
  }

  componentDidMount() {
    isBrowserNotSupported() ? this.setState({ dialogOpen: true }) : null;
    socket.on("msg", msg => {
      this.props.fetchBroadCastMessage(msg);
      this.setState({ dialogOpen: true });
    });
    if (localStorage.getItem("ff_jwt") && !this.props.currentUser) {
      this.props.getMe();
    } else if (this.props.currentUser && !localStorage.getItem("ff_jwt")) {
      this.props.removeUser();
    }
  }

  handleClose() {
    this.setState({ dialogOpen: false });
  }

  getVersion() {
    if (this.props.releaseNotes) {
      return this.props.releaseNotes[0].version;
    }
    return null;
  }

  renderDialogMessage() {
    if (this.props.message) {
      return <div>{this.props.message}</div>;
    }
    return (
      <div>
        {
          "Sorry, your browser may not be fully supported! We recommend Chrome v51+, Firefox v51+ or Edge v12+."
        }
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <MetricGaugeDrawer
          isDrawerOpen={this.props.isDrawerOpen}
          toggleMetricGaugeDrawer={status =>
            this.props.toggleMetricGaugeDrawer(status)
          }
          toggledMetrics={this.props.toggledMetrics}
          logScale={this.props.logScale}
          toggleAnnualFlowMetrics={d => this.props.toggleAnnualFlowMetrics(d)}
          handleToggleLogScale={d => this.props.handleToggleLogScale(d)}
          handleHydrographOverlay={status =>
            this.props.handleHydrographOverlay(status)
          }
          isHydrographOverlay={this.props.isHydrographOverlay}
          fixedYaxis={this.props.fixedYaxis}
          handleFixedYaxis={d => this.props.handleFixedYaxis(d)}
          currentGaugeId={
            this.props.annualFlowData
              ? this.props.annualFlowData.Gauge.id
              : null
          }
          getYaxisMax={(id, percentile) =>
            this.props.getYaxisMax(id, percentile)
          }
        />
        <Layout
          releaseNoteVersion={this.getVersion()}
          annualFlowData={this.props.annualFlowData}
          fetchCurrentGauge={d => this.props.fetchCurrentGauge(d)}
          currentUser={this.props.currentUser}
          removeUser={this.props.removeUser}
        />
        <Dialog
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={() => this.handleClose()}
        >
          {this.renderDialogMessage()}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <FlatButton
              label="Continue"
              primary={true}
              onClick={() => this.handleClose()}
            />
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    annualFlowData: state.metricDetail.annualFlowData,
    releaseNotes: state.releaseNote.releaseNotes,
    isDrawerOpen: state.metricDetail.isDrawerOpen,
    toggledMetrics: state.metricDetail.toggledMetrics,
    logScale: state.metricDetail.logScale,
    message: state.user.message,
    isHydrographOverlay: state.metricDetail.isHydrographOverlay,
    fixedYaxis: state.metricDetail.fixedYaxis,
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReleaseNotes: () => dispatch(fetchReleaseNotes()),
    fetchCurrentGauge: gaugeId => dispatch(fetchCurrentGauge(gaugeId)),
    toggleMetricGaugeDrawer: status =>
      dispatch(toggleMetricGaugeDrawer(status)),
    toggleAnnualFlowMetrics: d => dispatch(toggleAnnualFlowMetrics(d)),
    handleToggleLogScale: d => dispatch(handleToggleLogScale(d)),
    fetchBroadCastMessage: d => dispatch(fetchBroadCastMessage(d)),
    handleHydrographOverlay: status =>
      dispatch(handleHydrographOverlay(status)),
    handleFixedYaxis: d => dispatch(handleFixedYaxis(d)),
    getYaxisMax: (id, percentile) => dispatch(getYaxisMax(id, percentile)),
    getMe: () => dispatch(getMe()),
    removeUser: () => dispatch(removeUser()),
  };
};

Header.propTypes = {
  releaseNotes: PropTypes.array,
  message: PropTypes.string,
  fetchReleaseNotes: PropTypes.func,
  isDrawerOpen: PropTypes.bool,
  logScale: PropTypes.bool,
  fixedYaxis: PropTypes.number,
  toggledMetrics: PropTypes.array,
  toggleMetricGaugeDrawer: PropTypes.func,
  toggleAnnualFlowMetrics: PropTypes.func,
  handleToggleLogScale: PropTypes.func,
  fetchBroadCastMessage: PropTypes.func,
  handleHydrographOverlay: PropTypes.func,
  isHydrographOverlay: PropTypes.bool,
  annualFlowData: PropTypes.object,
  fetchCurrentGauge: PropTypes.func,
  handleFixedYaxis: PropTypes.func,
  getYaxisMax: PropTypes.func,
  currentUser: PropTypes.object,
  getMe: PropTypes.func,
  removeUser: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
