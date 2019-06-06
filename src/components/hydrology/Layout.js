import React from 'react';
import PropTypes from 'prop-types';

import Map from './Map';
import HydroTabs from './HydroCard/HydroTabs';
import ErrorBoundary from '../shared/ErrorBoundary';

export default class Layout extends React.Component {
  _updateHoverGauge(gaugeId) {
    this.props.updateHoveredGauge(
      this.props.gauges.find(gauge => gauge.id === gaugeId)
    );
  }

  render() {
    return (
      <div style={styles.container}>
        <Map
          gauges={this.props.gauges}
          hoveredGauge={this.props.hoveredGauge}
          fetchClassification={classId =>
            this.props.fetchClassification(classId)
          }
          fetchCurrentGauge={gaugeId => this.props.fetchCurrentGauge(gaugeId)}
          updateHoveredGauge={this.props.updateHoveredGauge}
        />
        <div style={{ zIndex: '2', minWidth: '650px', marginLeft: '30px' }}>
          <ErrorBoundary>
            <HydroTabs
              tabValue={this.props.tabValue}
              updateTab={tabValue => this.props.updateTab(tabValue)}
              currentGauge={this.props.currentGauge}
              currentClassification={this.props.currentClassification}
              removeClassGaugeProps={() => this.props.removeClassGaugeProps()}
              classifications={this.props.classifications}
              fetchCurrentGauge={gaugeId =>
                this.props.fetchCurrentGauge(gaugeId)
              }
              fetchClassification={classId =>
                this.props.fetchClassification(classId)
              }
              updateHoveredGauge={gaugeId => this._updateHoverGauge(gaugeId)}
              overLayBoxPlotMethods={this.props.overLayBoxPlotMethods}
              overLayBoxPlotData={this.props.overLayBoxPlotData}
              verticalOverlayBoxPlotData={this.props.verticalOverlayBoxPlotData}
            />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  tabValue: PropTypes.string,
  hoveredGauge: PropTypes.object,
  updateTab: PropTypes.func,
  gauges: PropTypes.array,
  currentGauge: PropTypes.object,
  currentClassification: PropTypes.object,
  fetchCurrentGauge: PropTypes.func,
  fetchClassification: PropTypes.func,
  removeClassGaugeProps: PropTypes.func,
  classifications: PropTypes.array,
  updateHoveredGauge: PropTypes.func,
  overLayBoxPlotMethods: PropTypes.object,
  overLayBoxPlotData: PropTypes.array,
  verticalOverlayBoxPlotData: PropTypes.array,
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '-60px auto 100px auto',
    height: '100%',
    width: '1300px',
  },
};
