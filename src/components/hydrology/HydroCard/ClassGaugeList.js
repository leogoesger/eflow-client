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

import {classInfo} from '../../../constants/classification';

export default class ClassGaugeList extends React.Component {
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

  _renderClassCard(classes) {
    return classes.map(classification => {
      const abbre = classInfo[`class${classification.id}`].abbre;
      const gaugeCount = classification.gauges.length;
      return (
        <Card key={classification.id}>
          <CardHeader
            title={`${classification.name} (${abbre})`}
            subtitle={`Gauge Count: ${gaugeCount}`}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <Table fixedHeader={true} selectable={true} multiSelectable={false}>
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
                style={{height: '40px', padding: '0px'}}
              >
                <TableRow style={{height: '20px'}}>
                  <TableHeaderColumn style={{height: '20px'}}>
                    {'ID'}
                  </TableHeaderColumn>
                  <TableHeaderColumn style={{height: '20px'}}>
                    {'Station Name'}
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={true}
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
      <div className="helloalsdkfjal" style={styles.container}>
        {this._renderClassCard(this.props.classifications)}
      </div>
    );
  }
}

ClassGaugeList.propTypes = {
  classifications: PropTypes.array,
};

const styles = {
  container: {
    maxHeight: '650px',
    overflow: 'scroll',
  },
};
