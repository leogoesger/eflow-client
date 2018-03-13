import React from 'react';
import Paper from 'material-ui/Paper';

const HydroInfo = props => {
  return <Paper style={styles.graph}>{JSON.stringify(props)}</Paper>;
};

const styles = {
  graph: {
    height: '750px',
    width: '100%',
    marginBottom: '20px',
    borderRadius: '0px',
  },
};

export default HydroInfo;
