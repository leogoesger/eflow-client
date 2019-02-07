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

class UploadData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
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
    const { data, getMe } = { ...this.props };
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
                    style={{ padding: '15px 0px 5px 15px', fontSize: '24px' }}
                  >
                    {data.name}
                  </div>
                  {!data.predictions.length && (
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
                  {this.getClassPrediction(data.predictions)}
                </Link>
              </div>
              <CardText
                style={{
                  fontSize: '16px',
                  color: Colors.grey,
                  marginTop: '16px',
                }}
              >{`Created at: ${date.getMonth() +
                1}/${date.getDate()}/${date.getFullYear()}`}</CardText>
            </div>
            <ActionIcons data={data} getMe={getMe} id={this.props.id} />
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

UploadData.propTypes = {
  id: PropTypes.number,
  data: PropTypes.object,
  getMe: PropTypes.func,
  currentGauge: PropTypes.object,
  gauges: PropTypes.array,
  removeClassGaugeProps: PropTypes.func,
  currentClassification: PropTypes.object,
  fetchCurrentGauge: PropTypes.func,
};

export default UploadData;
