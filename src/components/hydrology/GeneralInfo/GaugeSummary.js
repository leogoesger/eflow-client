import React from 'react';
import Paper from 'material-ui/Paper';

class GaugeSummary extends React.Component {
  render() {
    return <Paper style={styles.container}>{'Gauge summary page'}</Paper>;
  }
}

GaugeSummary.propTypes = {};

const styles = {
  container: {
    height: '750px',
    width: '100%',
    marginBottom: '20px',
    borderRadius: '0px',
  },
};

export default GaugeSummary;
