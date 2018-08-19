import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { navigateTo } from "../utils/helpers";

const UserHoc = Component => {
  class EnhancedComponent extends React.Component {
    componentDidMount() {
      if (!this.props.currentUser) {
        navigateTo("/login");
      }
    }
    render() {
      return <Component currentUser={this.props.currentUser} />;
    }
  }

  const mapStateToProps = state => {
    return {
      currentUser: state.user.currentUser,
    };
  };

  EnhancedComponent.propTypes = {
    currentUser: PropTypes.object,
  };

  return connect(
    mapStateToProps,
    null
  )(EnhancedComponent);
};

export default UserHoc;
