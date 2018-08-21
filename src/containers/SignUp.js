import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import Layout from "../components/signUp/Layout";
import Snackbar from "material-ui/Snackbar";
import { signUpUser, removeErrorMessage } from "../actions/user";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackOpen: false,
    };
  }

  componentDidMount() {
    document.title = "eFlows | Sign Up";
  }

  _handleRequestClose() {
    this.setState({ snackOpen: false });
  }

  render() {
    return (
      <React.Fragment>
        <div style={styles.banner} />
        <Paper style={styles.paperStyle}>
          <Layout signUpUser={d => this.props.signUpUser(d)} />
        </Paper>

        <Snackbar
          open={Boolean(this.props.userErrorMessage)}
          message={this.props.userErrorMessage}
          autoHideDuration={4000}
          onRequestClose={() => this.props.removeErrorMessage()}
        />
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  currentUser: PropTypes.object,
  signUpUser: PropTypes.func,
  userErrorMessage: PropTypes.string,
  removeErrorMessage: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    userErrorMessage: state.user.userErrorMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUpUser: d => dispatch(signUpUser(d)),
    removeErrorMessage: () => dispatch(removeErrorMessage()),
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
)(SignUp);
