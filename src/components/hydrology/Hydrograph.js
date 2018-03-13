import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import {LinePlot} from '../shared/plots';
import Summary from './Summary';

const Hydrograph = props => {
  let hydroData = [];
  if (props.currentGauge) {
    props.currentGauge.hydrographs[0].data.forEach((ele, index) =>
      hydroData.push({date: index, flow: ele})
    );
  } else {
    props.currentClassification.hydrographs[0].data.forEach((ele, index) =>
      hydroData.push({date: index, flow: ele})
    );
  }

  let summaryData = {};
  if (props.currentGauge) {
    summaryData = props.currentGauge;
  } else {
    summaryData = props.currentClassification;
  }

  return (
    <Paper style={styles.graph}>
      <LinePlot
        x={props.containerWidth / 10}
        y={20}
        width={props.containerWidth}
        height={350}
        data={hydroData}
        xValue={value => value.date}
        yValue={value => value.flow}
      />
      <Divider />

      <Summary summaryData={summaryData} />
    </Paper>
  );
};

Hydrograph.propTypes = {
  containerWidth: PropTypes.number,
  currentGauge: PropTypes.object,
  currentClassification: PropTypes.object,
};

const styles = {
  graph: {
    height: '750px',
    width: '100%',
    marginBottom: '20px',
    borderRadius: '0px',
  },
};

export default Hydrograph;
