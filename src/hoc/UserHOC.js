import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getMe, getFailedUpload } from "../actions/user";
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
          failedUploads={this.props.failedUploads}
          getFailedUpload={this.props.getFailedUpload}
        />
      );
    }
  }

  const mapStateToProps = state => {
    return {
      currentUser: state.user.currentUser,
      failedUploads: state.user.failedUploads,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      getMe: () => dispatch(getMe()),
      getFailedUpload: () => dispatch(getFailedUpload()),
    };
  };

  EnhancedComponent.propTypes = {
    currentUser: PropTypes.object,
    getMe: PropTypes.func,
    failedUploads: PropTypes.array,
    getFailedUpload: PropTypes.func,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(EnhancedComponent);
};

export default UserHoc;
