import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar, Paper } from 'material-ui';

import Layout from '../components/admin/Layout';
import adminActions from '../APIs/admin';
import { navigateTo } from '../utils/helpers';
import {
  removeUser,
  getFailedUpload,
  getMe,
  getUploads,
} from '../actions/user';
import { fetchAppInfo } from '../actions/appInfo';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackOpen: false,
      message: '',
      failedOffset: 0,
      offset: 0,
      limit: 7, //change this # to increase/decrease # of records per page
      loading: true,
    };
    this.updateClassMetricHandler = this.updateClassMetricHandler.bind(this);
    this.updateGaugeMetricHandler = this.updateGaugeMetricHandler.bind(this);
    this.broadcastMessageHandler = this.broadcastMessageHandler.bind(this);
    this.uploadFlowDataHandler = this.uploadFlowDataHandler.bind(this);
    this.uploadMetricResultHandler = this.uploadMetricResultHandler.bind(this);
    this.uploadClassHydrographHandler = this.uploadClassHydrographHandler.bind(
      this
    );
    this.uploadGaugeHydrographHandler = this.uploadGaugeHydrographHandler.bind(
      this
    );
    this.uploadFlowConditionHandler = this.uploadFlowConditionHandler.bind(
      this
    );
    this._handleRequestClose = this._handleRequestClose.bind(this);
    this.responseMessage = this.responseMessage.bind(this);
  }

  async componentDidMount() {
    if (!localStorage.getItem('ff_jwt')) {
      this.props.removeUser();
      localStorage.removeItem('ff_jwt');
      navigateTo('/login');
    }
    await this.setState({ loading: true });
    document.title = 'eFlows | Admin';
    await this.props.fetchAppInfo();
    await this.getPagedFailedUploads(0);
    await this.getPagedUploads(0);
    await this.setState({ loading: false });
  }

  async getPagedFailedUploads(page) {
    await this.setState({ loading: true });
    await this.setState(
      { failedOffset: this.state.failedOffset + this.state.limit * page },
      async () =>
        await this.props.getFailedUpload({
          limit: this.state.limit,
          offset: this.state.failedOffset,
        })
    );
    await this.setState({ loading: false });
  }

  async getPagedUploads(page) {
    await this.setState({ loading: true });
    await this.setState(
      { offset: this.state.offset + this.state.limit * page },
      async () =>
        await this.props.getUploads({
          limit: this.state.limit,
          offset: this.state.offset,
        })
    );
    await this.setState({ loading: false });
  }

  responseMessage() {
    return this.setState({
      snackOpen: true,
      message: 'Success, wait 1 min before next action!',
    });
  }

  _handleRequestClose() {
    this.setState({ snackOpen: false, message: '' });
  }

  updateClassMetricHandler() {
    adminActions.updateClassMetric().then(this.responseMessage);
  }

  updateGaugeMetricHandler(id) {
    adminActions.updateGaugeMetric(id).then(this.responseMessage);
  }

  broadcastMessageHandler(msg) {
    adminActions.broadcastMessage(msg).then(() => {
      this.setState({
        snackOpen: true,
        message: 'Success, wait 1 min before next action!',
      });
    });
  }

  uploadFlowDataHandler() {
    adminActions.uploadFlowData().then(this.responseMessage);
  }

  uploadMetricResultHandler() {
    adminActions.uploadMetricResult().then(this.responseMessage);
  }

  uploadClassHydrographHandler() {
    adminActions.uploadClassHydrograph().then(this.responseMessage);
  }

  uploadGaugeHydrographHandler() {
    adminActions.uploadGaugeHydrograph().then(this.responseMessage);
  }

  uploadFlowConditionHandler() {
    adminActions.uploadFlowCondition().then(this.responseMessage);
  }

  fetchAppInfo() {
    adminActions.fetchAppInfo();
  }

  render() {
    return (
      <React.Fragment>
        <div style={styles.banner} />
        <Paper style={styles.paperStyle}>
          <Layout
            updateClassMetric={this.updateClassMetricHandler}
            updateGaugeMetric={this.updateGaugeMetricHandler}
            broadcastMessage={this.broadcastMessageHandler}
            uploadFlowData={this.uploadFlowDataHandler}
            uploadMetricResult={this.uploadMetricResultHandler}
            uploadClassHydrograph={this.uploadClassHydrographHandler}
            uploadGaugeHydrograph={this.uploadGaugeHydrographHandler}
            uploadFlowConditionHandler={this.uploadFlowConditionHandler}
            removeUser={this.props.removeUser}
            appInfo={this.props.appInfo}
            failedUploads={this.props.failedUploads}
            getMe={this.props.getMe}
            getFailedUpload={page => this.getPagedFailedUploads(page)}
            uploads={this.props.uploads}
            getUploads={page => this.getPagedUploads(page)}
            limit={this.state.limit}
            failedLimit={this.state.failedLimit}
            offset={this.state.offset}
            failedOffset={this.state.failedOffset}
            loading={this.state.loading}
          />
        </Paper>

        <Snackbar
          open={this.state.snackOpen}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={() => this._handleRequestClose()}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    failedUploads: state.user.failedUploads,
    appInfo: state.appInfo.appInfo,
    uploads: state.user.uploads,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeUser: () => dispatch(removeUser()),
    fetchAppInfo: () => dispatch(fetchAppInfo()),
    getFailedUpload: pagination => dispatch(getFailedUpload(pagination)),
    getMe: () => dispatch(getMe()),
    getUploads: pagination => dispatch(getUploads(pagination)),
  };
};

Admin.propTypes = {
  currentUser: PropTypes.object,
  removeUser: PropTypes.func,
  appInfo: PropTypes.object,
  fetchAppInfo: PropTypes.func,
  getFailedUpload: PropTypes.func,
  failedUploads: PropTypes.object,
  getMe: PropTypes.func,
  uploads: PropTypes.object,
  getUploads: PropTypes.func,
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
    overflow: 'scroll',
  },
  warningIcon: { color: '#616161', height: '60px', width: '60px' },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
