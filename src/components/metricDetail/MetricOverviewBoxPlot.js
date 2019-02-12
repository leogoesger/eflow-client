import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Paper from 'material-ui/Paper';

import BoxPlot from '../shared/plots/BoxPlot';

class MetricOverviewBoxPlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomTransform: null,
    };
    this.zoom = d3
      .zoom()
      .scaleExtent([-10, 10])
      .translateExtent([[-100, -100], [700 + 100, 420 + 100]])
      .extent([[-100, -100], [700 + 100, 420 + 100]])
      .on('zoom', () => this.zoomed());
  }

  componentDidMount() {
    d3.select(this.svg).call(this.zoom);
  }

  componentDidUpdate() {
    d3.select(this.svg).call(this.zoom);
  }

  zoomed() {
    this.setState({
      zoomTransform: d3.event.transform,
    });
  }

  render() {
    if (!this.props.boxPlotData) {
      return null;
    }
    return (
      <Paper style={styles.container}>
        <div style={styles.yLabel}>{this.props.title}</div>
        <svg
          width={700}
          height={410}
          ref={el => (this.svg = el)}
          style={{ cursor: 'pointer' }}
        >
          <BoxPlot
            width={700}
            height={400}
            x={80}
            y={20}
            boxPlotData={this.props.boxPlotData}
            logScale={this.props.logScale}
            zoomTransform={this.state.zoomTransform}
            zoomType="detail"
          />
        </svg>
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
    width: '756px',
    height: '420px',
    margin: '30px 42px',
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
