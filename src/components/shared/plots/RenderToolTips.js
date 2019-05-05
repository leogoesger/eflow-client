import React from 'react';
import PropTypes from 'prop-types';
// import * as d3 from 'd3';

// import Axis from './Axis';
// import BoxplotOverlay from './BoxplotOverlay';
import { getCalenderDateFromOffset } from '../../../utils/helpers';

const keyMapping = {
  TEN: (
    <span>
      10<sup>th</sup>
    </span>
  ),
  TWENTYFIVE: (
    <span>
      25<sup>th</sup>
    </span>
  ),
  FIFTY: (
    <span>
      50<sup>th</sup>
    </span>
  ),
  SEVENTYFIVE: (
    <span>
      75<sup>th</sup>
    </span>
  ),
  NINTY: (
    <span>
      90<sup>th</sup>
    </span>
  ),
  // MAX: <span>MAX</span>,
  // MIN: <span>MIN</span>,
  TWENTY_FIVE: (
    <span>
      25<sup>th</sup>
    </span>
  ),
  SEVENTY_FIVE: (
    <span>
      75<sup>th</sup>
    </span>
  )
};

const RenderToolTips = props => {
  let { toolTipData } = props;
  let date = null;
  let simplePlot = false;

  if (toolTipData.length === 1) {
    simplePlot = true;
    date = getCalenderDateFromOffset(toolTipData[0].date);
  } else if (
    toolTipData &&
    toolTipData[0] &&
    toolTipData[0][Object.keys(toolTipData[0])[0]]
  ) {
    let jDate = toolTipData[0][Object.keys(toolTipData[0])[0]].date;
    date = getCalenderDateFromOffset(jDate);
  }

  let keys = toolTipData.map(tip => Object.keys(tip)[0]);

  let overlayTipData;
  let overlay = false;
  if (keys.includes('ten') && keys.includes('TEN')) {
    overlay = true;

    overlayTipData = toolTipData.filter(
      tip => Object.keys(tip)[0] === Object.keys(tip)[0].toUpperCase()
    );
    toolTipData = toolTipData.filter(
      tip => Object.keys(tip)[0] === Object.keys(tip)[0].toLowerCase()
    );
  }

  return (
    <foreignObject
      style={{
        x: overlay ? props.width - 40 : props.width,
        y: '15',
        width: overlay ? '90' : '50',
        height: '55',
        opacity: '0.6',
        background: 'white',
        border: 'black',
        borderWidth: '1px'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            fontSize: '9px',
            width: '55px'
          }}
        >
          {toolTipData && (
            <div>
              {date && <span style={{ fontWeight: 'bold' }}>{date}</span>}
              {toolTipData.map((tip, indx) => {
                if (tip === null) return;
                if (simplePlot) {
                  return <div key={indx}>{`Flow : ${tip.flow}`}</div>;
                }

                const key = Object.keys(tip)[0];
                if (
                  key.toUpperCase() !== 'MAX' &&
                  key.toUpperCase() !== 'MIN'
                ) {
                  return (
                    <div key={indx}>
                      {keyMapping[key.toUpperCase()]} : {tip[key].flow}
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
        {overlayTipData && (
          <div
            style={{
              fontSize: '9px',
              width: '35px'
            }}
          >
            {overlayTipData && (
              <div>
                {date && <span style={{ fontWeight: 'bold' }}>Comp</span>}
                {overlayTipData.map((tip, indx) => {
                  if (tip === null) return;
                  const key = Object.keys(tip)[0];
                  if (
                    key.toUpperCase() !== 'MAX' &&
                    key.toUpperCase() !== 'MIN'
                  ) {
                    return <div key={indx}>{tip[key].flow}</div>;
                  }
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </foreignObject>
  );
};

RenderToolTips.propTypes = {
  toolTipData: PropTypes.array,
  width: PropTypes.number
};

export default RenderToolTips;
