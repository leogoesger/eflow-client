import React from 'react';
import PropTypes from 'prop-types';
import {uniqBy, some, cloneDeep} from 'lodash';
import Drawer from 'material-ui/Drawer';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import Clear from 'material-ui/svg-icons/content/clear';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import {metricReference} from '../../constants/metrics';

import {Colors} from '../../styles';

class MetricGaugeDrawer extends React.Component {
  _getTableNames(data) {
    return uniqBy(data, d => d.displayTableName);
  }

  _checkToggleStatus(keyWord, all) {
    let filteredMetrics;

    // Filter all the metrics contain the display keyWord
    // all params handle the case for FALL TIMING, FALL TIMING WET.
    // includes will get both of them when used
    if (all) {
      filteredMetrics = metricReference.filter(
        metric => metric.display.includes(keyWord) && !metric.hidden
      );
    } else {
      filteredMetrics = metricReference.filter(
        metric => metric.display === keyWord && !metric.hidden
      );
    }

    // Check each one of the metrics has a counter part
    return filteredMetrics.every(filteredMetric =>
      some(this.props.toggledMetrics, filteredMetric)
    );
  }

  _handleToggle(keyWord, all, status) {
    let filteredMetrics;
    if (all) {
      filteredMetrics = metricReference.filter(
        metric => metric.display.includes(keyWord) && !metric.hidden
      );
    } else {
      filteredMetrics = metricReference.filter(
        metric => metric.display === keyWord && !metric.hidden
      );
    }

    const currentMetrics = cloneDeep(this.props.toggledMetrics);
    filteredMetrics.forEach(filteredMetric => {
      if (some(currentMetrics, filteredMetric)) {
        if (status === false) {
          return;
        }
        const index = currentMetrics
          .map(d => d.display)
          .indexOf(filteredMetric.display);
        currentMetrics.splice(index, 1);
      } else {
        currentMetrics.push(filteredMetric);
      }
    });
    this.props.toggleAnnualFlowMetrics(currentMetrics);
  }

  _getDisplay(name) {
    if (name.length > 20) {
      return name.slice(0, 15);
    }
    return name;
  }

  _renderTables() {
    const tableNames = this._getTableNames(metricReference);
    return tableNames.map(table => {
      if (table.displayTableName !== 'All Year') {
        return (
          <Card key={table.displayTableName}>
            <CardHeader
              title={table.displayTableName}
              actAsExpander={true}
              showExpandableButton={true}
              subtitleStyle={{paddingTop: '3px'}}
            />

            <CardText expandable={true}>
              {this._renderTableItems(table.displayTableName)}
            </CardText>
          </Card>
        );
      }
    });
  }

  _renderTableItems(tableName) {
    const metrics = metricReference.filter(
      metric =>
        metric.displayTableName == tableName &&
        metric.dimUnit !== 'none' &&
        metric.dimUnit !== '%'
    );
    return metrics.map(metric => {
      if (
        (!metric.hidden && metric.dimUnit === 'cfs') ||
        metric.dimUnit === 'julian date'
        // metric.dimUnit === 'days'
      ) {
        return (
          <Toggle
            key={metric.name}
            label={this._getDisplay(metric.display)}
            labelStyle={styles.labelStyle}
            value={'empty'}
            thumbSwitchedStyle={{
              size: '1',
              backgroundColor: metric.colors[0],
            }}
            trackSwitchedStyle={{backgroundColor: metric.colors[1]}}
            style={{padding: '1px 5px 1px 5px'}}
            onClick={() => this._handleToggle(metric.display)}
            toggled={this._checkToggleStatus(metric.display)}
          />
        );
      }
    });
  }

  _renderGeneralToggleBtns() {
    const generalList = [
      {label: 'All Timing Metrics', keyWord: 'Timing'},
      // {label: 'All Duration Metrics', keyWord: 'Duration'},
      {label: 'All Magnitude Metrics', keyWord: 'Magnitude'},
    ];
    return (
      <div style={{padding: '15px'}}>
        {generalList.map(item => {
          return (
            <Toggle
              key={item.keyWord}
              label={item.label}
              labelStyle={styles.labelStyle}
              value={'empty'}
              onClick={() =>
                this._handleToggle(
                  item.keyWord,
                  'true',
                  this._checkToggleStatus(item.keyWord, 'true')
                )
              }
              toggled={this._checkToggleStatus(item.keyWord, 'true')}
            />
          );
        })}

        <Divider style={{marginTop: '10px'}} />
        <Toggle
          label={'Log Scale'}
          labelStyle={styles.labelStyle}
          value={'empty'}
          onClick={() => this.props.handleToggleLogScale(!this.props.logScale)}
          toggled={this.props.logScale}
          style={{marginTop: '10px'}}
        />

        <RaisedButton
          label="Close"
          backgroundColor={Colors.gold}
          labelColor={Colors.white}
          labelStyle={{fontSize: '12px'}}
          icon={<Clear color={Colors.white} />}
          onClick={() => this.props.toggleMetricGaugeDrawer(false)}
          style={{margin: '20px auto 5px 50px'}}
        />
      </div>
    );
  }

  render() {
    return (
      <Drawer
        containerStyle={styles.container}
        docked={true}
        width={230}
        overlayStyle={styles.overlay}
        openSecondary={true}
        open={this.props.isDrawerOpen}
        onRequestChange={() => this.props.toggleMetricGaugeDrawer(false)}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '96%',
          }}
        >
          <div>{this._renderTables()}</div>
          {this._renderGeneralToggleBtns()}
        </div>
      </Drawer>
    );
  }
}

MetricGaugeDrawer.propTypes = {
  isDrawerOpen: PropTypes.bool,
  toggleMetricGaugeDrawer: PropTypes.func,
  toggledMetrics: PropTypes.array,
  logScale: PropTypes.bool,
  toggleAnnualFlowMetrics: PropTypes.func,
  handleToggleLogScale: PropTypes.func,
};

MetricGaugeDrawer.defaultProps = {
  toggledMetrics: [],
};

const styles = {
  container: {
    top: '60px',
    zIndex: '10',
    height: '94%',
  },
  overlay: {
    top: '60px',
    zIndex: '10',
  },
  labelStyle: {
    color: Colors.grey,
    fontSize: '14px',
  },
};

export default MetricGaugeDrawer;
