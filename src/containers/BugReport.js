import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import Layout from '../components/bugReport/Layout';
import Snackbar from 'material-ui/Snackbar';
import {submitBugReport} from '../actions/user';

class BugReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackOpen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.submitEmailMessage) {
      this.setState({snackOpen: true});
    }
  }

  _handleRequestClose() {
    this.setState({snackOpen: false});
  }

  render() {
    return (
      <React.Fragment>
        <div style={styles.banner} />
        <Paper style={styles.paperStyle}>
          <Layout submitBugReport={d => this.props.submitBugReport(d)} />
        </Paper>

        <Snackbar
          open={this.state.snackOpen}
          message={this.props.submitEmailMessage}
          autoHideDuration={4000}
          onRequestClose={() => this._handleRequestClose()}
        />
      </React.Fragment>
    );
  }
}

BugReport.propTypes = {
  submitBugReport: PropTypes.func,
  submitEmailMessage: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    submitEmailMessage: state.user.submitEmailMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitBugReport: d => dispatch(submitBugReport(d)),
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
  warningIcon: {color: '#616161', height: '60px', width: '60px'},
};
export default connect(mapStateToProps, mapDispatchToProps)(BugReport);
