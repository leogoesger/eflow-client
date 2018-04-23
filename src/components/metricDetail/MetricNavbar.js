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

class MetricNavbar extends React.Component {
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
          <TableRowColumn style={{height: '15px', paddingTop: '15px'}}>
            {gauge.id}
          </TableRowColumn>
          <TableRowColumn style={{height: '15px'}}>
            {gauge.stationName}
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  _selectRow() {
    return null;
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
              multiSelectable={false}
              onRowSelection={() => this._selectRow()}
            >
              {this._renderHeader()}
              <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={true}
                showRowHover={true}
                stripedRows={false}
              >
                <TableRow style={styles.tableRow}>
                  <TableRowColumn style={{height: '15px', paddingTop: '15px'}}>
                    {`Class ${classification.id}`}
                  </TableRowColumn>

                  <TableRowColumn style={{height: '15px'}}>
                    {classification.name}
                  </TableRowColumn>
                </TableRow>
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
      <Card style={styles.container}>
        <Card
          style={{cursor: 'pointer'}}
          onClick={() => this.props.removeClassGaugeProps()}
        >
          <CardHeader
            title={'Overview'}
            subtitle={'Boxplot Summary'}
            subtitleStyle={{paddingTop: '3px'}}
          />
        </Card>
        {this._renderClassCard(this.props.classifications)}
      </Card>
    );
  }
}

MetricNavbar.propTypes = {
  fetchClassification: PropTypes.func,
  classifications: PropTypes.array,
  updateHoveredGauge: PropTypes.func,
  fetchCurrentGauge: PropTypes.func,
  removeClassGaugeProps: PropTypes.func,
};

const styles = {
  container: {
    width: '35%',
    height: '600px',
    overflow: 'scroll',
    padding: '10px',
  },
  tableRow: {
    height: '40px',
    padding: '0px',
    cursor: 'pointer',
  },
};

export default MetricNavbar;
