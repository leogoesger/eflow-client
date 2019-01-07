import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { navigateTo } from "../utils/helpers";
import Layout from "../components/profile/uploadHydrograph/Layout";

import {
  fetchClassification,
  removeCurrentClass,
  fetchClassifications,
} from "../actions/classification";
import {
  fetchGauges,
  fetchCurrentGauge,
  removeCurrentGauge,
} from "../actions/gauge";
import { updateHoveredGauge } from "../actions/hydrology";

class UploadHydrograph extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.currentUser) {
      localStorage.removeItem("ff_jwt");
      navigateTo("/login");
    }
    this.props.fetchClassifications();
    this.props.fetchGauges();
  }

  removeClassGaugeProps() {
    this.props.removeCurrentGauge();
    this.props.removeCurrentClass();
  }

  render() {
    if (!this.props.currentUser) return null;

    return (
      <React.Fragment>
        <Layout
          data={this.props.currentUser.uploadData[this.props.match.params.id]}
          fetchCurrentGauge={gaugeId => this.props.fetchCurrentGauge(gaugeId)}
          gauges={this.props.gauges}
          currentGauge={this.props.currentGauge}
          currentClassification={this.props.currentClassification}
          removeClassGaugeProps={() => this.removeClassGaugeProps()}
          classifications={this.props.classifications}
          fetchClassification={classId =>
            this.props.fetchClassification(classId)
          }
          updateHoveredGauge={this.props.updateHoveredGauge}
        />
      </React.Fragment>
    );
  }
}

UploadHydrograph.propTypes = {
  match: PropTypes.object,
  containerWidth: PropTypes.number,
  currentGauge: PropTypes.object,
  currentClassification: PropTypes.object,
  removeClassGaugeProps: PropTypes.func,
  overLayBoxPlotData: PropTypes.array,
  verticalOverlayBoxPlotData: PropTypes.array,
  files: PropTypes.array,
  gauges: PropTypes.array,
  fetchCurrentGauge: PropTypes.func,
  removeCurrentClass: PropTypes.func,
  removeCurrentGauge: PropTypes.func,
  currentUser: PropTypes.object,
  classifications: PropTypes.array,
  fetchClassification: PropTypes.func,
  fetchClassifications: PropTypes.func,
  updateHoveredGauge: PropTypes.func,
  fetchGauges: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    gauges: state.gauge.gauges,
    currentGauge: state.gauge.currentGauge,
    currentClassification: state.classification.currentClassification,
    currentUser: state.user.currentUser,
    classifications: state.classification.classifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchClassification: classId => dispatch(fetchClassification(classId)),
    fetchGauges: () => dispatch(fetchGauges()),
    fetchCurrentGauge: gaugeId => dispatch(fetchCurrentGauge(gaugeId)),
    removeCurrentGauge: () => dispatch(removeCurrentGauge()),
    removeCurrentClass: () => dispatch(removeCurrentClass()),
    fetchClassifications: () => dispatch(fetchClassifications()),
    updateHoveredGauge: gaugeId => dispatch(updateHoveredGauge(gaugeId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadHydrograph);
