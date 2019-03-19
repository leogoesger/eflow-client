import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Divider, IconButton } from 'material-ui';
import { cloneDeep } from 'lodash';

import Uploader from '../../containers/Uploader';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { Colors } from '../../styles';
import Loader from '../../components/shared/loader/Loader';
import UploadData from './UploadData';

const ProfileLayout = ({
  currentUser,
  limit,
  offset,
  getPagedUserUploads,
  loading,
}) => {
  if (!currentUser) {
    return null;
  }

  let sortedData = [];
  if (currentUser.uploadData) {
    sortedData = cloneDeep(currentUser.uploadData).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  return (
    <React.Fragment>
      <Loader loading={loading} />
      <div style={styles.banner} />
      <Paper style={styles.paperStyle}>
        <div
          style={{ fontSize: '36px', margin: '20px 20px 20px 20px' }}
        >{`Welcome, ${currentUser.firstName}`}</div>

        <div style={{ margin: '20px 20px 20px 20px', color: Colors.grey }}>
          <div style={{ lineHeight: '20px' }}>
            Upload your time series data here. The application requires a commas
            separated values (.csv) file with two columns: column 1 contains
            dates (mm/dd/yyyy) and column 2 contains the corresponding daily
            flow (cfs). The columns must have the following exact headers:
            <span style={{ fontWeight: 'bold' }}>date</span> for the dates
            column and the <span style={{ fontWeight: 'bold' }}>flow</span> for
            the flow column. Any gaps in the data will be interpolated. Please
            download{' '}
            <a
              href="https://s3-us-west-1.amazonaws.com/funcflow/resources/sample.csv"
              style={{ color: Colors.gold }}
            >
              this sample csv file
            </a>{' '}
            for a data format example. Tool is under development for user
            uploaded streamflow data, please use results with caution.
            <br />
          </div>
          <Uploader enabled={true} getPagedUserUploads={getPagedUserUploads} />
        </div>
        <div>
          <Divider style={{ margin: '0px' }} />
        </div>
        {!sortedData.length ? (
          <div style={{ margin: '40px 20px' }}>
            {
              "Looks like you haven't uploaded any data yet. Try uploading some time series data!"
            }
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 'auto',
              width: '75%',
            }}
          >
            <span style={{ margin: '25px 0px', fontWeight: 'bold' }}>
              Uploads
            </span>
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
                offset + limit > currentUser.uploadCount
                  ? currentUser.uploadCount
                  : offset + limit
              } of ${currentUser.uploadCount}`}</div>
              <div style={{ margin: '9px 0px' }}>
                <IconButton
                  tooltip={`Previous ${limit}`}
                  tooltipPosition="bottom-center"
                  disabled={!offset}
                  onClick={() => getPagedUserUploads(-1)}
                >
                  <LeftArrow />
                </IconButton>
                <IconButton
                  tooltip={`Next ${limit}`}
                  tooltipPosition="bottom-center"
                  disabled={
                    currentUser.uploadCount > offset + limit ? false : true
                  }
                  onClick={() => getPagedUserUploads(1)}
                >
                  <RightArrow />
                </IconButton>
              </div>
            </div>
          </div>
        )}
        <div>
          {sortedData.map(d => (
            <UploadData
              id={d.id}
              key={d.id}
              data={d}
              getPagedUserUploads={getPagedUserUploads}
              count={currentUser.uploadCount}
              offset={offset}
            />
          ))}
        </div>
      </Paper>
    </React.Fragment>
  );
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

ProfileLayout.propTypes = {
  currentUser: PropTypes.object || null,
  offset: PropTypes.number,
  limit: PropTypes.number,
  getPagedUserUploads: PropTypes.func,
  loading: PropTypes.bool,
};

export default ProfileLayout;
