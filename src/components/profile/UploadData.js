import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui';

import { Colors } from '../../styles';
import {
  classificationColor,
  classification,
} from '../../constants/classification';
import { ActionIcons } from './ActionIcons';
import upload from '../../APIs/upload';

class UploadData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  async handleDeleteUpload(id) {
    await upload.deleteTimeSeries(id);
    if (this.props.offset === this.props.count - 1)
      this.props.getPagedUserUploads(-1);
    else this.props.getPagedUserUploads(0);
  }

  async onPredict(id) {
    await upload.predictTimeSeries(id);
    this.props.getPagedUserUploads(0);
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
      <div style={{ color, paddingLeft: '14px', fontSize: '12px' }}>
        Prediction: {currentP.prediction}
      </div>
    );
  }

  render() {
    const { data } = { ...this.props };
    const date = new Date(data.createdAt);

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
                  <div
                    style={{
                      padding: '0px 0px 0px 15px',
                      fontSize: '13px',
                      color: `rgb(255, 179, 0)`,
                    }}
                  >
                    {data.location}
                  </div>

                  {/* {!data.predictions.length && (
                    <div
                      style={{
                        color: '#d2691e',
                        paddingLeft: '14px',
                        fontSize: '12px',
                      }}
                    >
                      {
                        "Click predict button to predict this dataset's hydrological classification."
                      }
                    </div>
                  )}
                  {this.getClassPrediction(data.predictions)} */}
                </Link>
              </div>
              <CardText
                style={{
                  fontSize: '15px',
                  color: Colors.grey,
                  padding: '22px 15px 0px 15px',
                  marginTop: !data.location ? '13px' : '0px',
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
