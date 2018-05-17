import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
} from 'material-ui/Table';

import SearchBar from '../../containers/SearchBar';

class MetricNavbar extends React.Component {
  _selectRow(e) {
    this.props.fetchAnnualFlowData({gaugeId: e.id});
    this.props.fetchHydrographOverlay(e.id);
  }

  _renderHeader() {
    return (
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
        enableSelectAll={false}
        style={{height: '40px', padding: '0px'}}
      >
        <TableRow style={{height: '20px'}}>
          <TableHeaderColumn style={{height: '20px'}}>{'ID'}</TableHeaderColumn>
          <TableHeaderColumn style={{height: '20px'}}>
            {'Station Name'}
          </TableHeaderColumn>
        </TableRow>
      </TableHeader>
    );
  }

  _renderRow(gauges) {
    if (!gauges) {
      return null;
    }

    return gauges.map(gauge => {
      return (
        <TableRow
          key={gauge.id}
          style={{height: '40px', padding: '0px', cursor: 'pointer'}}
        >
          <TableRowColumn
            style={
              gauge.id == this.props.currentGaugeId
                ? {height: '15px', paddingTop: '15px', fontWeight: '800'}
                : {height: '15px', paddingTop: '15px'}
            }
          >
            {gauge.id}
          </TableRowColumn>
          <TableRowColumn
            style={
              gauge.id == this.props.currentGaugeId
                ? {height: '15px', fontWeight: '800'}
                : {height: '15px'}
            }
          >
            {gauge.stationName}
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  _renderClassCard(classes) {
    return classes.map(classification => {
      const gaugeCount = classification.gauges.length;
      return (
        <Card key={classification.id}>
          <CardHeader
            title={classification.name}
            subtitle={`Gauge Count: ${gaugeCount}`}
            actAsExpander={true}
            showExpandableButton={true}
            subtitleStyle={{paddingTop: '3px'}}
          />
          <CardText expandable={true}>
            <Table
              fixedHeader={true}
              selectable={true}
              onRowSelection={e => this._selectRow(classification.gauges[e])}
            >
              {this._renderHeader()}
              <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={false}
                showRowHover={true}
                stripedRows={false}
              >
                {this._renderRow(classification.gauges)}
              </TableBody>
            </Table>
          </CardText>
        </Card>
      );
    });
  }

  render() {
    if (!this.props.classifications) {
      return null;
    }
    return (
      <Card style={styles.container} className="metric-navbar">
        <div style={{padding: '0px 15px 5px 15px'}}>
          <SearchBar />
        </div>
        <Card style={{cursor: 'pointer'}}>
          <CardHeader
            className="tour-metricDetail-navbar"
            title={'Overview'}
            subtitle={'Boxplot Summary'}
            subtitleStyle={{paddingTop: '3px'}}
            onClick={() => this.props.fetchAnnualFlowData()}
          />
        </Card>
        {this._renderClassCard(this.props.classifications)}
      </Card>
    );
  }
}

MetricNavbar.propTypes = {
  classifications: PropTypes.array,
  fetchAnnualFlowData: PropTypes.func,
  fetchHydrographOverlay: PropTypes.func,
  isHydrographOverlay: PropTypes.bool,
  currentGaugeId: PropTypes.number,
};

const styles = {
  container: {
    width: '30%',
    height: '600px',
    overflow: 'scroll',
  },
  tableRow: {
    height: '40px',
    padding: '0px',
    cursor: 'pointer',
  },
};

export default MetricNavbar;
