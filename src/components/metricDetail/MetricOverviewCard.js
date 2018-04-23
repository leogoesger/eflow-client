import React from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Loader from '../shared/loader/Loader';
import MetricOverviewBoxPlot from './MetricOverviewBoxPlot';

class MetricOverviewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metricTableValue: 0,
      metricTableName: 'AllYears',
      metricColumnValue: 0,
      metricColumnName: 'average',
    };
  }
  componentWillMount() {
    if (!this.props.allClassesBoxPlots) {
      return this.props.fetchAllClassesBoxPlots();
    }
  }

  componentDidMount() {
    this.setState({
      metricTableValue: 0,
      metricColumnValue: 0,
    });
  }

  _handleTableChange(event, index, value) {
    this.setState(
      {
        metricTableValue: value,
        metricTableName: event.target.innerText,
      },
      () => {
        this.setState({
          metricColumnValue: 0,
          metricColumnName: Object.keys(
            this.props.allClassesBoxPlots[this.state.metricTableName]
          )[0],
        });
      }
    );
  }

  _handleColumnChange(event, index, value) {
    this.setState({
      metricColumnValue: value,
      metricColumnName: event.target.innerText,
    });
  }

  _renderTableItems() {
    return Object.keys(this.props.allClassesBoxPlots).map((key, index) => (
      <MenuItem value={index} key={index} primaryText={key} />
    ));
  }

  _renderColumnItems() {
    return Object.keys(
      this.props.allClassesBoxPlots[this.state.metricTableName]
    ).map((key, index) => (
      <MenuItem value={index} key={index} primaryText={key} />
    ));
  }

  render() {
    if (!this.props.allClassesBoxPlots) {
      return (
        <React.Fragment>
          <Loader loading={this.props.loading} />
          <Card style={{width: '65%', height: '600px', overflow: 'scroll'}} />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Card style={{width: '65%', height: '600px', overflow: 'scroll'}}>
          <div style={styles.selectionContainer}>
            <SelectField
              floatingLabelText="Metric Category"
              value={this.state.metricTableValue}
              onChange={(event, index, value) =>
                this._handleTableChange(event, index, value)
              }
            >
              {this._renderTableItems()}
            </SelectField>
            <SelectField
              floatingLabelText="Metric Name"
              value={this.state.metricColumnValue}
              onChange={(event, index, value) =>
                this._handleColumnChange(event, index, value)
              }
            >
              {this._renderColumnItems()}
            </SelectField>
          </div>
          <MetricOverviewBoxPlot
            boxPlotData={
              this.props.allClassesBoxPlots[this.state.metricTableName][
                this.state.metricColumnName
              ]
            }
          />
        </Card>
        <Loader loading={this.props.loading} />
      </React.Fragment>
    );
  }
}

MetricOverviewCard.propTypes = {
  fetchAllClassesBoxPlots: PropTypes.func,
  loading: PropTypes.bool,
  allClassesBoxPlots: PropTypes.object,
};

const styles = {
  selectionContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: '20px',
  },
};
export default MetricOverviewCard;
