import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getMe } from "../actions/user";
import { fetchGauges, fetchCurrentGauge } from "../actions/gauge";
import { navigateTo } from "../utils/helpers";

const UserHoc = Component => {
  class EnhancedComponent extends React.Component {
    componentDidMount() {
      if (!this.props.currentUser) {
        navigateTo("/login");
      }
    }
    render() {
      return (
        <Component
          currentUser={this.props.currentUser}
          getMe={this.props.getMe}
          currentGauge={this.props.currentGauge}
          gauges={this.props.gauges}
          fetchCurrentGauge={id => this.props.fetchCurrentGauge(id)}
        />
      );
    }
  }

  const mapStateToProps = state => {
    return {
      currentUser: state.user.currentUser,
      currentGauge: state.gauge.currentGauge,
      gauges: state.gauge.gauges,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      getMe: () => dispatch(getMe()),
      fetchGauges: () => dispatch(fetchGauges()),
      fetchCurrentGauge: gaugeId => dispatch(fetchCurrentGauge(gaugeId)),
    };
  };

  EnhancedComponent.propTypes = {
    currentUser: PropTypes.object,
    currentGauge: PropTypes.object,
    gauges: PropTypes.array,
    getMe: PropTypes.func,
    failedUploads: PropTypes.array,
    getFailedUpload: PropTypes.func,
    fetchCurrentGauge: PropTypes.func,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(EnhancedComponent);
};

export default UserHoc;
