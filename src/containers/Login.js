import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper, Snackbar } from 'material-ui';
import Layout from '../components/login/Layout';
import { loginUser, removeErrorMessage } from '../actions/user';

class Login extends React.Component {
  componentDidMount() {
    document.title = 'eFlows | Login';
    if (localStorage.getItem('ff_jwt')) {
      return <Redirect to="/profile" />;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div style={styles.banner} />
        <Paper style={styles.paperStyle}>
          <Layout loginUser={d => this.props.loginUser(d)} />
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

Login.propTypes = {
  currentUser: PropTypes.object,
  loginUser: PropTypes.func,
  loginUserMessage: PropTypes.string,
  userErrorMessage: PropTypes.string,
  removeErrorMessage: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    loginUserMessage: state.user.loginUserMessage,
    userErrorMessage: state.user.userErrorMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: d => dispatch(loginUser(d)),
    removeErrorMessage: () => dispatch(removeErrorMessage()),
  };
};

const styles = {
  banner: {
    backgroundColor: '#424242',
    height: '230px',
    zIndex: '0',
  },
  paperStyle: {
    height: '600px',
    margin: '-60px auto 160px auto',
    width: '1000px',
    zIndex: '2',
  },
  warningIcon: { color: '#616161', height: '60px', width: '60px' },
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
