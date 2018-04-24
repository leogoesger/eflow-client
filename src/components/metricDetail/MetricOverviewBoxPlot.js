import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import BoxPlot from '../shared/plots/BoxPlot';

class MetricOverviewBoxPlot extends React.Component {
  render() {
    if (!this.props.boxPlotData) {
      return null;
    }
    return (
      <Paper style={styles.container}>
        <div style={styles.yLabel}>{this.props.title}</div>
        <BoxPlot
          width={700}
          height={400}
          x={70}
          y={20}
          boxPlotData={this.props.boxPlotData}
          logScale={this.props.logScale}
        />
      </Paper>
    );
  }
}

MetricOverviewBoxPlot.propTypes = {
  boxPlotData: PropTypes.array,
  logScale: PropTypes.bool,
  title: PropTypes.string,
};

const styles = {
  container: {
    width: '720px',
    height: '420px',
    margin: '20px auto',
    position: 'relative',
  },
  yLabel: {
    position: 'absolute',
    fontSize: '16px',
    left: '6px',
    top: '100px',
    color: '#616161',
    writingMode: 'vertical-rl',
    transform: 'rotate(-180deg)',
  },
};
export default MetricOverviewBoxPlot;
