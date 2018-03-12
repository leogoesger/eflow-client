import React from 'react';
import Paper from 'material-ui/Paper';

const HydroInfo = () => {
  return (
    <Paper style={styles.graph}>
      <h2 style={styles.headline}>Controllable Tab B</h2>
      <p>
        This is another example of a controllable tab. Remember, if you use
        controllable Tabs, you need to give all of your tabs values or else you
        wont be able to select them.
      </p>
    </Paper>
  );
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
