import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Divider } from 'material-ui';
import { paramRange } from '../../constants/params';

import { Tooltip } from 'react-tippy';

const reMappedParams = [
  'broad_sigma',
  'peak_detect_perc',
  'wet_threshold_perc',
  'peak_sensitivity_wet',
  'min_flush_percentage',
];
class ParamsSliders extends React.Component {
  render() {
    const params = { ...this.props.params };

    return (
      <div style={{ marginTop: '10px' }}>
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
                let realSeason =
                  reMappedParams.indexOf(param) > -1 ? 'fall_params' : null;

                if (
                  season === 'fall_params' &&
                  reMappedParams.indexOf(param) > -1
                )
                  return null;
                else
                  return (
                    <div
                      key={indx + index}
                      style={{
                        width: '45%',
                        margin: 'auto',
                      }}
                    >
                      <Tooltip
                        html={
                          paramRange[season][param].description ? (
                            <p>{paramRange[season][param].description}</p>
                          ) : null
                        }
                        // title={paramRange[season][param].description}
                        position="top"
                        arrow={true}
                      >
                        <div style={{ paddingLeft: '10px' }}>
                          {paramRange[season][param].map}:{' '}
                          {params[realSeason || season][param]}
                        </div>
                      </Tooltip>
                      <Slider
                        min={paramRange[season][param].min}
                        max={paramRange[season][param].max}
                        step={paramRange[season][param].step}
                        value={params[realSeason || season][param]}
                        onChange={(e, value) =>
                          this.props.handleSlider(
                            e,
                            value,
                            realSeason || season,
                            param
                          )
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
