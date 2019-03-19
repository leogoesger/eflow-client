import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui';
import { cloneDeep } from 'lodash';
import { getDateFromJulian } from '../../utils/helpers';

import { Colors } from '../../styles';
import {
  classificationColor,
  classification,
} from '../../constants/classification';
import { ActionIcons } from './ActionIcons';
import upload from '../../APIs/upload';
import Params from '../uploader/Params';
import { classParms } from '../../constants/params';

class UploadData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      userParams: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.data.predictions[0] && nextProps.data.predictions[0]) {
      this.setState({
        userParams: classParms[nextProps.data.predictions[0].prediction],
        open: true,
      });
    }
  }

  handleDialog(bool) {
    this.setState({ open: bool });
  }

  setUserParams(userParams) {
    this.setState({ userParams });
  }

  handleSlider(event, value, season, param) {
    const tmpState = { ...this.state.userParams };
    tmpState[season][param] = value;
    this.setState({ userParams: tmpState });
  }

  async handleDeleteUpload(id) {
    await upload.deleteTimeSeries(id);
    if (this.props.offset === this.props.count - 1 && this.props.offset > 0)
      this.props.getPagedUserUploads(-1);
    else this.props.getPagedUserUploads(0);
  }

  async onPredict(id) {
    await upload.predictTimeSeries(id);
    await this.props.getPagedUserUploads(0);
  }

  onClickHandler() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  getClassPrediction(predictions) {
    if (!predictions.length) {
      return null;
    }
    const currentP = predictions[0];
    const color =
      classificationColor[classification.indexOf(currentP.prediction)][0];
    // const key = predictionMap[currentP.prediction];
    // const average =
    //   currentP[key].reduce((a, b) => Number(a) + Number(b), 0) /
    //   currentP[key].length;
    return (
      <div style={{ color, paddingLeft: '15px', fontSize: '12px' }}>
        Prediction: {currentP.prediction}
      </div>
    );
  }

  getFlowObj() {
    const { yearRanges, flowMatrix } = this.props.data;
    const flows = [];
    const dates = [];

    yearRanges.forEach((year, indx) => {
      flowMatrix.forEach((fl, julianDate) => {
        if (fl[indx] >= 0) {
          flows.push(Number(fl[indx]));
          dates.push(getDateFromJulian(julianDate, year));
        }
      });
    });
    return { flows, dates };
  }

  async onSubmit() {
    this.setState({ loading: true });
    const { userParams } = this.state;
    const { data } = this.props;
    const { flows, dates } = this.getFlowObj(data);

    const tmpUserParams = cloneDeep(userParams);

    const {
      max_zero_allowed_per_year,
      max_nan_allowed_per_year,
    } = tmpUserParams['winter_params'];

    delete tmpUserParams['winter_params'];

    tmpUserParams['winter_params'] = {
      max_zero_allowed_per_year,
      max_nan_allowed_per_year,
    };

    if (flows.length !== dates.length) {
      return this.setState({
        flows: [],
        dates: [],
        message: "Length of flow and date's arrays are not equal",
      });
    }
    try {
      await upload.upDateTimeSeries({
        flows,
        dates,
        params: { ...tmpUserParams },
        id: data.id,
      });

      this.setState({
        open: false,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        isError: true,
        open: false,
        message: `Could not process data`,
      });
    }
  }

  render() {
    const { data } = { ...this.props };
    const date = new Date(data.createdAt);
    let riverInfo = '';
    if (data.riverName) riverInfo += `River: ${data.riverName} | `;
    if (data.location) riverInfo += `Location: ${data.location}`;

    return (
      <React.Fragment>
        <Card
          style={{
            margin: '10px auto',
            width: '70%',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ width: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link
                  to={{
                    pathname: `uploads/${this.props.id}`,
                    ...this.props,
                  }}
                >
                  <div
                    style={{
                      padding: '15px 0px 0px 15px',
                      fontSize: '20px',
                      color: 'rgba(0,0,0,0.87)',
                    }}
                  >
                    {data.name}
                  </div>
                  {!data.predictions.length && (
                    <div
                      style={{
                        color: '#d2691e',
                        paddingLeft: '15px',
                        fontSize: '12px',
                      }}
                    >
                      {
                        "Click predict button to predict this dataset's hydrological classification."
                      }
                    </div>
                  )}
                  {data.predictions.length > 0 &&
                    this.getClassPrediction(data.predictions)}
                  <div
                    style={{
                      padding: '0px 0px 0px 15px',
                      fontSize: '13px',
                      color: `rgb(255, 179, 0)`,
                    }}
                  >
                    {riverInfo ? riverInfo : <div style={{ height: '13px' }} />}
                  </div>
                </Link>
              </div>
              <CardText
                style={{
                  fontSize: '15px',
                  color: Colors.grey,
                  padding: '15px 14px 0px 15px',
                  // marginTop: !data.location ? '1px' : '0px',
                }}
              >{`Created at: ${date.getMonth() +
                1}/${date.getDate()}/${date.getFullYear()}`}</CardText>
            </div>
            <ActionIcons
              data={data}
              id={this.props.id}
              handleDeleteUpload={id => this.handleDeleteUpload(id)}
              onPredict={id => this.onPredict(id)}
            />
          </div>
        </Card>
        <Params
          userParams={this.state.userParams}
          setUserParams={userParams => this.setUserParams(userParams)}
          handleSlider={(event, value, season, param) =>
            this.handleSlider(event, value, season, param)
          }
          open={this.state.open}
          handleDialog={bool => this.handleDialog(bool)}
          predictedClass={
            data.predictions[0] ? data.predictions[0].prediction : ''
          }
          reCalc={true}
          onSubmit={() => this.onSubmit()}
        />
      </React.Fragment>
    );
  }
}

UploadData.propTypes = {
  id: PropTypes.number,
  data: PropTypes.object,
  offset: PropTypes.number,
  count: PropTypes.number,
  getPagedUserUploads: PropTypes.func,
};

export default UploadData;
