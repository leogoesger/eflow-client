import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import Layout from "../components/login/Layout";
import Snackbar from "material-ui/Snackbar";
import { loginUser } from "../actions/user";
import { navigateTo } from "../utils/helpers";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackOpen: false,
    };
  }

  componentDidMount() {
    document.title = "Eflows | Login";
    if (localStorage.getItem("FF_JWT")) {
      navigateTo("/admin");
    }
  }

  _handleRequestClose() {
    this.setState({ snackOpen: false });
  }

  render() {
    return (
      <React.Fragment>
        <div style={styles.banner} />
        <Paper style={styles.paperStyle}>
          <Layout loginUser={d => this.props.loginUser(d)} />
        </Paper>

        <Snackbar
          open={this.state.snackOpen}
          message={this.props.loginUserMessage}
          autoHideDuration={4000}
          onRequestClose={() => this._handleRequestClose()}
        />
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  currentUser: PropTypes.object,
  loginUser: PropTypes.func,
  loginUserMessage: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    loginUserMessage: state.user.loginUserMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: d => dispatch(loginUser(d)),
  };
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
  },
  warningIcon: { color: "#616161", height: "60px", width: "60px" },
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
