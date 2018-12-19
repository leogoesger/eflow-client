import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Divider } from 'material-ui';
import { paramRange } from '../../constants/params';

class ParamsSliders extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { ...this.props.params };
  // }

  // handleSlider(event, value, season, param) {
  //   const tmpState = { ...this.state };
  //   tmpState[season][param] = value;
  //   this.setState({ ...tmpState });
  // }

  render() {
    const params = { ...this.props.params };

    return (
      <div>
        {Object.keys(params).map((season, indx) => {
          return (
            <div
              key={indx}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              <p style={{ fontWeight: 'bold', padding: '10px', width: '100%' }}>
                {paramRange[season].map}
              </p>
              {Object.keys(params[season]).map((param, index) => {
                return (
                  <div
                    key={indx + index}
                    style={{
                      width: '45%',
                      margin: 'auto',
                    }}
                  >
                    <div style={{ paddingLeft: '10px' }}>
                      {paramRange[season][param].map}: {params[season][param]}
                    </div>
                    <Slider
                      min={paramRange[season][param].min}
                      max={paramRange[season][param].max}
                      step={paramRange[season][param].step}
                      value={params[season][param]}
                      onChange={(e, value) =>
                        this.props.handleSlider(e, value, season, param)
                      }
                      sliderStyle={{ margin: '0px 0px 5px 0px' }}
                    />
                  </div>
                );
              })}
              <Divider style={{ margin: '10px' }} />
            </div>
          );
        })}
      </div>
    );
  }
}

ParamsSliders.propTypes = {
  params: PropTypes.object,
  handleSlider: PropTypes.func,
};

export default ParamsSliders;
