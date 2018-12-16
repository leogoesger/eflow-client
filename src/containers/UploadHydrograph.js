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

class UploadHydrograph extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.currentUser) {
      localStorage.removeItem("ff_jwt");
      navigateTo("/login");
    }
  }

  removeClassGaugeProps() {
    this.props.removeCurrentGauge();
    this.props.removeCurrentClass();
  }

  render() {
    return (
      <React.Fragment>
        <Layout
          data={this.props.currentUser.uploadData[this.props.match.params.id]}
          fetchCurrentGauge={gaugeId => this.props.fetchCurrentGauge(gaugeId)}
          gauge={this.props.gauge}
          currentGauge={this.props.currentGauge}
          currentClassification={this.props.currentClassification}
          removeClassGaugeProps={() => this.removeClassGaugeProps()}
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
  gauge: PropTypes.array,
  fetchCurrentGauge: PropTypes.func,
  removeCurrentClass: PropTypes.func,
  removeCurrentGauge: PropTypes.func,
  currentUser: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    gauges: state.gauge.gauges,
    currentGauge: state.gauge.currentGauge,
    currentClassification: state.classification.currentClassification,
    currentUser: state.user.currentUser,
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
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadHydrograph);
