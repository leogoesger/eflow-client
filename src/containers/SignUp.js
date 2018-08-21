import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import Layout from "../components/signUp/Layout";
import Snackbar from "material-ui/Snackbar";
import { signUpUser } from "../actions/user";

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
          open={this.state.snackOpen}
          message={this.props.signUpUserMessage}
          autoHideDuration={4000}
          onRequestClose={() => this._handleRequestClose()}
        />
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  currentUser: PropTypes.object,
  signUpUser: PropTypes.func,
  signUpUserMessage: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    signUpUserMessage: state.user.signUpUserMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUpUser: d => dispatch(signUpUser(d)),
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
