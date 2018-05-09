import React from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlighter';

import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
} from 'material-ui/Table';
import {Card} from 'material-ui/Card';

export default class SearchTable extends React.Component {
  getColumnName(name) {
    if (name.length > 20) {
      return `${name.slice(0, 20)} ...`;
    }
    return name;
  }

  _selectRow(e) {
    const gauge = this.props.searchedGauges[e];
    this.props.fetchAnnualFlowData({gaugeId: gauge.id});
    this.props.fetchHydrographOverlay(gauge.id);
    this.props.handleChange('');
  }

  _renderRow(gauges) {
    return gauges.map(gauge => {
      return (
        <TableRow key={gauge.id} style={{cursor: 'pointer', height: '35px'}}>
          <TableRowColumn style={{height: '35px', width: '60px'}}>
            <div style={styles.column}>
              <Highlight matchElement={'span'} search={this.props.keyWord}>
                {gauge.id.toString()}
              </Highlight>
            </div>
          </TableRowColumn>
          <TableRowColumn style={{height: '35px'}}>
            <div style={styles.column}>
              <Highlight matchElement={'span'} search={this.props.keyWord}>
                {this.getColumnName(gauge.stationName)}
              </Highlight>
            </div>
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    if (!this.props.searchedGauges.length) {
      return null;
    }
    return (
      <Card>
        <Table
          fixedHeader={true}
          selectable={true}
          onRowSelection={e => this._selectRow(e)}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow style={{height: '35px'}}>
              <TableHeaderColumn style={{height: '35px'}}>
                <div style={styles.column}>{'ID'}</div>
              </TableHeaderColumn>
              <TableHeaderColumn style={{height: '35px'}}>
                <div style={styles.column}>{'Station Name'}</div>
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover={true}
            stripedRows={false}
          >
            {this._renderRow(this.props.searchedGauges)}
          </TableBody>
        </Table>
      </Card>
    );
  }
}

SearchTable.propTypes = {
  searchedGauges: PropTypes.array,
  searchGauge: PropTypes.func,
  fetchAnnualFlowData: PropTypes.func,
  fetchHydrographOverlay: PropTypes.func,
  keyWord: PropTypes.string,
  handleChange: PropTypes.func,
};

const styles = {
  column: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
};
