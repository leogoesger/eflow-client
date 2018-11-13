import React from 'react';
import PropTypes from 'prop-types';
import {
  // Divider,
  // TextField,
  // SelectField,
  Menu,
  MenuItem,
  // RaisedButton,
} from 'material-ui';

// import { Colors } from "../../styles";
// import Styles from "../../styles/Styles";
// import AdminActionBtn from "./AdminActionBtn";
import AWSUploads from './AWSUploads';
import AppInfo from './AppInfo';
import RenderFailedUpload from './RenderFailedUpload';
import { navigateTo } from '../../utils/helpers';

import Eject from 'material-ui/svg-icons/action/eject';
import Book from 'material-ui/svg-icons/av/library-books';
import Info from 'material-ui/svg-icons/action/info';
import FailedUpload from 'material-ui/svg-icons/file/cloud-off';
import Upload from 'material-ui/svg-icons/file/cloud-done';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Sorry, we are updating the website for the next 2 mins!',
      classId: 1,
      loadAdmin: true,
      loadAppInfo: false,
      loadUploads: false,
      loadFailedUploads: false,
    };
    this.updateGaugeMetricHandler = this.updateGaugeMetricHandler.bind(this);
    this.broadcastMessageHandler = this.broadcastMessageHandler.bind(this);
  }

  onClickHandler(e) {
    const resetStates = {
      loadAdmin: false,
      loadAppInfo: false,
      loadUploads: false,
      loadFailedUploads: false,
    };

    resetStates[e] = true;

    this.setState(resetStates);
  }

  _handleChange(v, field) {
    if (field === 'classId') {
      return this.setState({ [field]: v + 1 });
    }
    return this.setState({ [field]: v });
  }

  logoutUser() {
    localStorage.removeItem('ff_jwt');
    this.props.removeUser();
    navigateTo('/');
  }

  updateGaugeMetricHandler() {
    this.props.updateGaugeMetric(this.state.classId);
  }

  broadcastMessageHandler() {
    this.props.broadcastMessage(this.state.message);
  }

  renderClicked(clicked) {
    const {
      updateClassMetric,
      uploadFlowData,
      uploadMetricResult,
      uploadClassHydrograph,
      uploadGaugeHydrograph,
      uploadFlowConditionHandler,
      appInfo,
      failedUploads,
      getMe,
      getFailedUpload,
      updateGaugeMetric,
    } = this.props;

    if (clicked.loadAdmin) {
      return (
        <AWSUploads
          updateGaugeMetric={updateGaugeMetric}
          updateClassMetric={updateClassMetric}
          uploadFlowData={uploadFlowData}
          uploadMetricResult={uploadMetricResult}
          uploadClassHydrograph={uploadClassHydrograph}
          uploadGaugeHydrograph={uploadGaugeHydrograph}
          uploadFlowConditionHandler={uploadFlowConditionHandler}
        />
      );
    } else if (clicked.loadAppInfo) {
      return <AppInfo appInfo={appInfo} />;
    } else if (clicked.loadFailedUploads) {
      return (
        <div>
          <h1 style={{ padding: '40px 20px' }}>Failed Uploads</h1>

          {failedUploads.map((data, key) => {
            return (
              <RenderFailedUpload
                key={key}
                data={data}
                getMe={getMe}
                getFailedUpload={getFailedUpload}
              />
            );
          })}
        </div>
      );
    } else if (clicked.loadUploads) {
      return (
        <div>
          <h1 style={{ padding: '40px 20px' }}>Uploaded Files</h1>
          <h1 style={{ padding: '40px 20px' }}>Feature coming soon!</h1>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ width: '20%', float: 'left' }}>
          <Menu>
            <MenuItem
              primaryText="Admin"
              value={0}
              leftIcon={<Book />}
              onClick={() => this.onClickHandler('loadAdmin')}
            />
            <MenuItem
              primaryText="App Info"
              leftIcon={<Info />}
              onClick={() => this.onClickHandler('loadAppInfo')}
            />
            <MenuItem
              primaryText="Uploaded Files"
              leftIcon={<Upload />}
              onClick={() => this.onClickHandler('loadUploads')}
            />
            <MenuItem
              primaryText="Failed Uploads"
              leftIcon={<FailedUpload />}
              onClick={() => this.onClickHandler('loadFailedUploads')}
            />
            <MenuItem
              primaryText="Log Out"
              leftIcon={<Eject />}
              onClick={() => this.logoutUser()}
            />
          </Menu>
        </div>
        <div style={{ width: '80%', float: 'right' }}>
          <div style={{ width: '90%', margin: 'auto' }}>
            {this.renderClicked(this.state)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  updateClassMetric: PropTypes.func,
  updateGaugeMetric: PropTypes.func,
  broadcastMessage: PropTypes.func,
  uploadFlowData: PropTypes.func,
  uploadMetricResult: PropTypes.func,
  uploadClassHydrograph: PropTypes.func,
  uploadGaugeHydrograph: PropTypes.func,
  removeUser: PropTypes.func,
  uploadFlowConditionHandler: PropTypes.func,
  failedUploads: PropTypes.array,
  appInfo: PropTypes.object,
  getMe: PropTypes.func,
  getFailedUpload: PropTypes.func,
};

export default Layout;
