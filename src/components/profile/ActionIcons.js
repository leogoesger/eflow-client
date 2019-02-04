import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IconButton } from 'material-ui';
import { Tooltip } from 'react-tippy';
import Delete from 'material-ui/svg-icons/action/delete';
import Open from 'material-ui/svg-icons/action/open-in-new';
import Predict from 'material-ui/svg-icons/editor/bubble-chart';
import Loader from '../shared/loader/Loader';

import upload from '../../APIs/upload';
import Download from './Download';

const onDelete = async (id, getMe) => {
  await upload.deleteTimeSeries(id);
  getMe();
};

const onPredict = async (id, getMe) => {
  await upload.predictTimeSeries(id);
  getMe();
};

export class ActionIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  async onPredict(id) {
    this.setState({ loading: true });
    await onPredict(id, this.props.getMe);
    // await upload.predictTimeSeries(id);
    // this.getMe();
    this.setState({ loading: false });
  }

  render() {
    const { data, getMe, indx } = this.props;
    return (
      <div style={{ display: 'flex', marginTop: '70px' }}>
        <Loader loading={this.state.loading} />
        <Download data={data} />
        {!data.predictions.length && (
          <React.Fragment>
            <div
              style={{
                marginTop: '6px',
                fontSize: '36px',
                color: '#bdbdbd',
              }}
            >
              {'|'}
            </div>
            <div>
              <Tooltip
                title={'Predict Classification'}
                position="top"
                arrow={true}
              >
                <IconButton>
                  <Predict
                    onClick={() => this.onPredict(data.id)}
                    color={'#f9a825'}
                    style={{
                      cursor: 'pointer',
                    }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          </React.Fragment>
        )}
        <div
          style={{
            marginTop: '6px',
            fontSize: '36px',
            color: '#bdbdbd',
          }}
        >
          {'|'}
        </div>
        <div>
          <Tooltip title={'Delete'} position="top" arrow={true}>
            <IconButton>
              <Delete
                onClick={() => onDelete(data.id, getMe)}
                color={'#f9a825'}
                style={{
                  cursor: 'pointer',
                }}
              />
            </IconButton>
          </Tooltip>
        </div>

        <div
          style={{
            marginTop: '6px',
            fontSize: '36px',
            color: '#bdbdbd',
          }}
        >
          {'|'}
        </div>
        <div>
          <Link
            to={{
              pathname: `uploadhydrograph/${indx}`,
              ...this.props,
            }}
          >
            <Tooltip title={'Open'} position="top" arrow={true}>
              <IconButton>
                <Open
                  color={'#f9a825'}
                  style={{
                    cursor: 'pointer',
                  }}
                />
              </IconButton>
            </Tooltip>
          </Link>
        </div>
      </div>
    );
  }
}

ActionIcons.propTypes = {
  indx: PropTypes.any,
  data: PropTypes.object,
  getMe: PropTypes.func,
};
