import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Paper } from "material-ui";

import Layout from "../components/appInfo/Layout";
import { navigateTo } from "../utils/helpers";
import { removeUser } from "../actions/user";
import { fetchAppInfo } from "../actions/appInfo";

class AppInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!localStorage.getItem("ff_jwt")) {
      this.props.removeUser();
      localStorage.removeItem("ff_jwt");
      navigateTo("/login");
    }
    this.props.fetchAppInfo();
  }

  render() {
    return (
      <React.Fragment>
        <div style={styles.banner} />
        <Paper style={styles.paperStyle}>
          <Layout appInfo={this.props.appInfo} />
        </Paper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    appInfo: state.appInfo.appInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeUser: () => dispatch(removeUser()),
    fetchAppInfo: () => dispatch(fetchAppInfo()),
  };
};

AppInfo.propTypes = {
  appInfo: PropTypes.object,
  fetchAppInfo: PropTypes.func,
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
)(AppInfo);
