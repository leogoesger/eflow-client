import React from 'react';
import Paper from 'material-ui/Paper';

class ClassSummary extends React.Component {
  render() {
    return <Paper style={styles.container}>{'Class summary page'}</Paper>;
  }
}

ClassSummary.propTypes = {};

const styles = {
  container: {
    height: '750px',
    width: '100%',
    marginBottom: '20px',
    borderRadius: '0px',
  },
};

export default ClassSummary;
