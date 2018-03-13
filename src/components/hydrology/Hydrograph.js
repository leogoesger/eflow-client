import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import {LinePlot} from '../shared/plots';
import Summary from './Summary';

const Hydrograph = props => {
  const tableData = [
    {
      name: 'Spring',
      status: '12-01',
      status1: '12-01',
      status2: '12-01',
    },
    {
      name: 'Summer',
      status: '12-01',
      status1: '12-01',
      status2: '12-01',
    },
    {
      name: 'Fall',
      status: '12-01',
      status1: '12-01',
      status2: '12-01',
    },
    {
      name: 'Winter',
      status: '12-01',
      status1: '12-01',
      status2: '12-01',
    },
    {
      name: 'Winter',
      status: '12-01',
      status1: '12-01',
      status2: '12-01',
    },
    {
      name: 'Winter',
      status: '12-01',
      status1: '12-01',
      status2: '12-01',
    },
    {
      name: 'Winter',
      status: '12-01',
      status1: '12-01',
      status2: '12-01',
    },
    {
      name: 'Winter',
      status: '12-01',
      status1: '12-01',
      status2: '12-01',
    },
  ];
  return (
    <Paper style={styles.graph}>
      <LinePlot
        x={props.containerWidth / 10}
        y={20}
        width={props.containerWidth}
        height={350}
        data={props.data}
        xValue={value => value.date}
        yValue={value => value.flow}
      />
      <Divider />

      <Summary summaryData={tableData} />
    </Paper>
  );
};

Hydrograph.propTypes = {
  data: PropTypes.array,
  containerWidth: PropTypes.number,
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
