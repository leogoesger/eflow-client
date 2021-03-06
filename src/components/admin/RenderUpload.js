import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui';
import { Tooltip } from 'react-tippy';
import Delete from 'material-ui/svg-icons/action/delete';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import { CSVLink } from 'react-csv';
import { navigateTo } from '../../utils/helpers';

import { Colors } from '../../styles';

const getCSVdata = data => {
  const csvData = [['date', 'flow']];
  for (let i = 0; i < data.dates.length; i++) {
    csvData.push([data.dates[i], data.flows[i]]);
  }
  return csvData;
};

const RenderUpload = ({ data, handleDeleteUpload }) => {
  const date = new Date(data.createdAt);
  const csvData = getCSVdata(data);
  return (
    <Card
      style={{
        margin: '10px auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{ cursor: 'pointer', width: '400px' }}
          onClick={() => navigateTo(`/uploads/${data.id}`)}
        >
          <div style={{ padding: '10px', fontSize: '15px' }}>{data.name}</div>
          <CardText
            style={{
              padding: '0px 10px 10px 10px',
              fontSize: '10px',
              color: Colors.grey,
            }}
          >
            <div>{`Owner: ${data.user.firstName} ${
              data.user.lastName
            } | Role: ${data.user.role}`}</div>
            <div>{`Email: ${data.user.email} | Created at: ${date.getMonth() +
              1}/${date.getDate()}/${date.getFullYear()}`}</div>
          </CardText>
        </div>
        <div style={{ margin: '20px -200px 10px 10px' }}>
          <Tooltip title={'Download'} position="top" arrow={true}>
            <CSVLink data={csvData} filename={`${data.name}.csv`}>
              <FileDownload color={Colors.gold} />
            </CSVLink>
          </Tooltip>
        </div>

        <div
          style={{
            marginTop: '20px',
            marginRight: '10px',
          }}
        >
          <Tooltip title={'Delete'} position="top" arrow={true}>
            <Delete
              onClick={() => handleDeleteUpload(data.id)}
              color={'#f9a825'}
              style={{
                cursor: 'pointer',
              }}
            />
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

RenderUpload.propTypes = {
  data: PropTypes.object,
  handleDeleteUpload: PropTypes.func,
};

export default RenderUpload;
