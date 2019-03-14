import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Divider, IconButton } from 'material-ui';

import AWSUploads from './AWSUploads';
import AppInfo from './AppInfo';
import RenderFailedUpload from './RenderFailedUpload';
import RenderUpload from './RenderUpload';
import { navigateTo } from '../../utils/helpers';
import upload from '../../APIs/upload';
import Loader from '../shared/loader/Loader';

import Eject from 'material-ui/svg-icons/action/eject';
import Book from 'material-ui/svg-icons/av/library-books';
import Info from 'material-ui/svg-icons/action/info';
import FailedUpload from 'material-ui/svg-icons/file/cloud-off';
import Upload from 'material-ui/svg-icons/file/cloud-done';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

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

  async handleDeleteUpload(id) {
    await upload.deleteTimeSeries(id);
    if (this.props.offset === this.props.uploads.count - 1)
      this.props.getUploads(-1);
    else this.props.getUploads(0);
  }

  async handleDeleteFailedUpload(id) {
    await upload.deleteTimeSeries(id);
    if (this.props.failedOffset === this.props.failedUploads.count - 1)
      this.props.getFailedUpload(-1);
    else this.props.getFailedUpload(0);
  }

  renderClicked(clicked) {
    const {
      updateClassMetric,
      uploadFlowData,
      uploadMetricResult,
      uploadClassHydrograph,
      uploadGaugeHydrograph,
      uploadFlowConditionHandler,
      broadcastMessage,
      appInfo,
      failedUploads,
      getFailedUpload,
      updateGaugeMetric,
      uploads,
      getUploads,
      offset,
      limit,
      failedOffset,
    } = this.props;

    if (clicked.loadAdmin) {
      return (
        <AWSUploads
          broadcastMessage={broadcastMessage}
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
      return <div>{appInfo && <AppInfo appInfo={appInfo} />}</div>;
    } else if (clicked.loadFailedUploads) {
      return (
        <div>
          {this.renderHeader(
            'Failed Uploads',
            failedUploads,
            failedOffset,
            limit,
            getFailedUpload
          )}

          {failedUploads.rows &&
            failedUploads.rows.map((data, key) => {
              return (
                <RenderFailedUpload
                  key={key}
                  data={data}
                  handleDeleteFailedUpload={id =>
                    this.handleDeleteFailedUpload(id)
                  }
                />
              );
            })}
        </div>
      );
    } else if (clicked.loadUploads) {
      return (
        <div style={{ position: 'relative' }}>
          {this.renderHeader(
            'Uploaded Files',
            uploads,
            offset,
            limit,
            getUploads
          )}

          {uploads.rows &&
            uploads.rows.map((data, key) => {
              return (
                <RenderUpload
                  key={key}
                  data={data}
                  handleDeleteUpload={id => this.handleDeleteUpload(id)}
                />
              );
            })}
        </div>
      );
    }
    return null;
  }

  renderHeader(title, data, offset, limit, getData) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ margin: '25px 0px', fontWeight: 'bold' }}>{title}</span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div
            style={{
              fontSize: '13px',
              margin: '25px 0px',
            }}
          >{`${offset + 1} - ${
            offset + limit > data.count ? data.count : offset + limit
          } of ${data.count}`}</div>
          <div style={{ margin: '9px 0px' }}>
            <IconButton
              tooltip={`Previous ${limit}`}
              tooltipPosition="bottom-center"
              disabled={!offset}
              onClick={() => getData(-1)}
            >
              <LeftArrow />
            </IconButton>
            <IconButton
              tooltip={`Next ${limit}`}
              tooltipPosition="bottom-center"
              disabled={data.count > offset + limit ? false : true}
              onClick={() => getData(1)}
            >
              <RightArrow />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Loader loading={this.props.loading} />
        <div
          style={{
            width: '20%',
            float: 'left',
          }}
        >
          <Menu>
            <MenuItem
              primaryText="Admin"
              value={0}
              leftIcon={<Book />}
              onClick={() => this.onClickHandler('loadAdmin')}
            />
            <Divider style={{ width: '98%' }} />
            <MenuItem
              primaryText="App Info"
              leftIcon={<Info />}
              onClick={() => this.onClickHandler('loadAppInfo')}
              disabled={!this.props.appInfo}
            />
            <MenuItem
              primaryText="Uploaded Files"
              leftIcon={<Upload />}
              onClick={() => this.onClickHandler('loadUploads')}
              disabled={!(this.props.uploads && this.props.uploads.rows)}
            />
            <MenuItem
              primaryText="Failed Uploads"
              leftIcon={<FailedUpload />}
              onClick={() => this.onClickHandler('loadFailedUploads')}
              disabled={
                !(this.props.failedUploads && this.props.failedUploads.rows)
              }
            />
            <MenuItem
              primaryText="Log Out"
              leftIcon={<Eject />}
              onClick={() => this.logoutUser()}
            />
          </Menu>
        </div>

        <div
          style={{
            width: '78%',
            float: 'right',
            borderLeft: '1px solid rgb(224,224,224)',
            height: 'inherit',
          }}
        >
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
  failedUploads: PropTypes.object,
  appInfo: PropTypes.object,
  getMe: PropTypes.func,
  getFailedUpload: PropTypes.func,
  uploads: PropTypes.object,
  getUploads: PropTypes.func,
  limit: PropTypes.number,
  failedOffset: PropTypes.number,
  offset: PropTypes.number,
  loading: PropTypes.bool,
};

export default Layout;
