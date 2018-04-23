import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

class MetricOverviewBoxPlot extends React.Component {
  render() {
    return (
      <Paper style={styles.container}>
        {JSON.stringify(this.props.boxPlotData)}
      </Paper>
    );
  }
}

MetricOverviewBoxPlot.propTypes = {
  boxPlotData: PropTypes.array,
};

const styles = {
  container: {
    width: '720px',
    height: '420px',
    margin: '20px auto',
  },
};
export default MetricOverviewBoxPlot;
