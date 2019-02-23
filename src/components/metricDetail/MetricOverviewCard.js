import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import {
  Card,
  CardHeader,
  RaisedButton,
  Divider,
  FlatButton,
} from 'material-ui';
import Setting from 'material-ui/svg-icons/action/settings';
import Image from 'material-ui/svg-icons/image/image';
import MenuItem from 'material-ui/MenuItem';
import * as domtoimage from 'dom-to-image-more';

import { Colors } from '../../styles';
import Loader from '../shared/loader/Loader';
import MetricOverviewBoxPlot from './MetricOverviewBoxPlot';
import MetricBoxPlotDrawer from './MetricBoxPlotDrawer';
import { metricReference } from '../../constants/metrics';
import { conditionTypes } from '../../constants/conditionTypes';

class MetricOverviewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: 'All',
      conditionValue: 0,
      metricTableValue: 0,
      metricTableName: 'AllYears',
      metricColumnValue: 0,
      metricColumnName: 'average',
      title: 'Annual Average (cfs)',
      logScale: false,
      openDrawer: false,
      fixedYAxis: false,
    };
  }

  async componentDidMount() {
    if (!this.props.allClassesBoxPlots) {
      await this.props.fetchAllClassesBoxPlots('ALL');
    }

    this.setState({
      metricTableValue: 0,
      metricColumnValue: 0,
      conditionValue: 0,
    });
  }

  async _handleConditionChange(event, index, value) {
    await this.setState(
      {
        condition: conditionTypes[index],
        conditionValue: value,
      },
      () => {
        this.props.fetchAllClassesBoxPlots(this.state.condition.toUpperCase());
      }
    );
  }

  toggleFixedYAxis() {
    this.setState({ fixedYAxis: !this.state.fixedYAxis });
  }

  toggleDrawer(bool) {
    this.setState({ openDrawer: bool });
  }

  _getDisplayValue(key1, value1, key2, value2) {
    let objectFound;
    if (key2) {
      objectFound = find(
        metricReference,
        e => e[key1] === value1 && e[key2] === value2
      );
    } else {
      objectFound = find(metricReference, e => e[key1] === value1);
    }
    return objectFound;
  }

  _toggleLogScale() {
    this.setState({ logScale: !this.state.logScale });
  }

  _handleTitleChange() {
    if (this.state.metricColumnName === 'magWet') {
      return this.setState({
        title: 'Winter Magnitude (cfs)',
      });
    }
    const metric = this._getDisplayValue(
      'tableName',
      this.state.metricTableName,
      'columnName',
      this.state.metricColumnName
    );
    // console.log(metric);
    const display = metric.display;
    const dimUnit = metric.dimUnit;
    this.setState({
      title: `${display} (${dimUnit})`,
    });
  }

  async _handleTableChange(event, index, value) {
    await this.setState({
      metricTableValue: value,
      metricTableName: this._getDisplayValue(
        'displayTableName',
        event.target.innerText
      ).tableName,
    });
    if (this.state.metricTableName == 'FallWinters') {
      this.setState({ metricTableName: 'Winters' });
    }
    await this.setState({
      metricColumnValue: 0,
      metricColumnName: Object.keys(
        this.props.allClassesBoxPlots[this.state.metricTableName]
      )[0],
    });
    this._handleTitleChange();
  }

  async _handleColumnChange(event, index, value) {
    let winterBaseflow;
    if (event.target.innerText === 'Winter Baseflow') {
      winterBaseflow = 'magWet';
    }
    await this.setState({
      metricColumnValue: value,
      metricColumnName:
        winterBaseflow ||
        this._getDisplayValue('display', event.target.innerText).columnName,
    });
    this._handleTitleChange();
  }

  _renderTableItems() {
    return Object.keys(this.props.allClassesBoxPlots).map((key, index) => {
      return (
        <MenuItem
          value={index}
          key={index}
          primaryText={this._getDisplayValue('tableName', key).displayTableName}
        />
      );
    });
  }

  _renderColumnItems() {
    if (!this.props.allClassesBoxPlots[this.state.metricTableName]) {
      return null;
    }
    return Object.keys(
      this.props.allClassesBoxPlots[this.state.metricTableName]
    ).map((key, index) => {
      if (key !== 'magWet') {
        const metric = this._getDisplayValue(
          'columnName',
          key,
          'tableName',
          this.state.metricTableName
        );
        return (
          <MenuItem value={index} key={key} primaryText={metric.display} />
        );
      } else {
        return (
          <MenuItem value={index} key={key} primaryText={'Winter Baseflow'} />
        );
      }
    });
  }

  _renderBoxplots() {
    if (!this.props.allClassesBoxPlots[this.state.metricTableName]) {
      return null;
    }

    const { bPYAxisRange } = this.props;

    let tableName =
      this.state.metricColumnName === 'magWet'
        ? 'FallWinters'
        : this.state.metricTableName;

    const metric = find(
      bPYAxisRange,
      metric =>
        Object.keys(metric[Object.keys(metric)])[0] ===
          this.state.metricColumnName && Object.keys(metric)[0] === tableName
    );

    return (
      <MetricOverviewBoxPlot
        boxPlotData={
          this.props.allClassesBoxPlots[this.state.metricTableName][
            this.state.metricColumnName
          ]
        }
        logScale={this.state.logScale}
        title={this.state.title}
        yRange={
          this.state.fixedYAxis &&
          metric[tableName][this.state.metricColumnName]
            ? metric[tableName][this.state.metricColumnName]
            : null
        }
      />
    );
  }

  filterBtns(node) {
    return node.className !== 'tour-metricDetail-display';
  }

  handleSaveAsImageBtn() {
    /* eslint-disable */
    domtoimage
      .toJpeg(this.refs['boxPlot'], { filter: this.filterBtns })
      .then(function(dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
      });
  }

  render() {
    if (!this.props.allClassesBoxPlots) {
      return (
        <React.Fragment>
          <Loader loading={this.props.loading} />
          <Card style={{ width: '65%', height: '600px', overflow: 'scroll' }} />
        </React.Fragment>
      );
    }

    const metric = this._getDisplayValue(
      'columnName',
      this.state.metricColumnName,
      'tableName',
      `${
        this.state.metricColumnName === 'magWet'
          ? 'FallWinters'
          : this.state.metricTableName
      }`
    );
    if (!metric) return null;
    return (
      <div
        id={'boxPlot'}
        style={{ width: '840px', height: '600px' }}
        ref={'boxPlot'} //eslint-disable-line
      >
        <Card style={styles.container}>
          <RaisedButton
            className="tour-metricDetail-display"
            label="Display"
            backgroundColor={Colors.gold}
            labelColor={Colors.white}
            disabled={false}
            style={{
              top: '25px',
              zIndex: 1,
              position: 'absolute',
              left: '703px',
            }}
            icon={<Setting />}
            labelStyle={{ fontSize: '12px' }}
            onClick={() => this.toggleDrawer(true)}
          />
          <FlatButton
            className="tour-metricDetail-display"
            label="Save As Image"
            style={{
              top: '25px',
              zIndex: 1,
              position: 'absolute',
              left: '503px',
            }}
            onClick={() => this.handleSaveAsImageBtn()}
            labelStyle={{ fontSize: '12px', color: Colors.gold }}
            icon={<Image color={Colors.gold} />}
          />
          <div style={{ width: '60%', marginTop: '15px' }}>
            <CardHeader
              style={{ paddingRight: '0px', marginTop: '10px' }}
              title={`Water Year Type: ${this.state.condition}`}
              textStyle={{ paddingRight: '0px' }}
              subtitle={`Category: ${
                this._getDisplayValue('tableName', this.state.metricTableName)
                  .displayTableName
              } | Metric: ${metric.display}`}
              subtitleStyle={{ color: Colors.gold }}
              actAsExpander={false}
              showExpandableButton={false}
            />
          </div>
          <Divider />
          {this._renderBoxplots()}
        </Card>
        <Loader loading={this.props.loading} />
        <MetricBoxPlotDrawer
          openDrawer={this.state.openDrawer}
          toggleDrawer={bool => this.toggleDrawer(bool)}
          fetchAllClassesBoxPlots={this.props.fetchAllClassesBoxPlots}
          logScale={this.state.logScale}
          toggleLogScale={() => this._toggleLogScale()}
          allClassesBoxPlots={this.props.allClassesBoxPlots}
          metricTableValue={this.state.metricTableValue}
          metricTableName={this.state.metricTableName}
          metricColumnName={this.state.metricColumnName}
          metricColumnValue={this.state.metricColumnValue}
          title={this.state.title}
          handleColumnChange={(e, i, v) => this._handleColumnChange(e, i, v)}
          handleTableChange={(e, i, v) => this._handleTableChange(e, i, v)}
          renderColumnItems={() => this._renderColumnItems()}
          renderTableItems={() => this._renderTableItems()}
          condition={this.state.condition}
          conditionValue={this.state.conditionValue}
          handleConditionChange={(e, i, v) =>
            this._handleConditionChange(e, i, v)
          }
          toggleFixedYAxis={() => this.toggleFixedYAxis()}
          fixedYAxis={this.state.fixedYAxis}
        />
      </div>
    );
  }
}

MetricOverviewCard.propTypes = {
  fetchAllClassesBoxPlots: PropTypes.func,
  loading: PropTypes.bool,
  allClassesBoxPlots: PropTypes.object,
  bPYAxisRange: PropTypes.array,
};

const styles = {
  container: {
    width: '100%',
    height: '600px',
    overflow: 'auto',
    margin: '0 auto',
    position: 'relative',
  },
  selectionContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '90%',
    padding: '16px',
    marginTop: '15px',
  },
  BLcontainer: {
    position: 'absolute',
    right: '20px',
    top: '20px',
    width: '100px',
    padding: '20px',
    boxShadow: '2px 2px 45px -5px rgba(110,110,110,0.5)',
    zIndex: '20',
  },
  labelStyle: {
    color: Colors.grey,
    fontSize: '12px',
  },
};

export default MetricOverviewCard;
