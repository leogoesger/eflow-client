import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
} from 'material-ui/Table';

import {LinePlot} from '../shared/plots';

const Hydrograph = props => {
  const tableData = [
    {
      name: 'Spring',
      status: '12-01',
      status1: '12-01',
      status2: '12-01',
    },
    {
      name: 'Summer',
      status: '12-01',
      status1: '12-01',
      status2: '12-01',
    },
    {
      name: 'Fall',
      status: '12-01',
      status1: '12-01',
      status2: '12-01',
    },
    {
      name: 'Winter',
      status: '12-01',
      status1: '12-01',
      status2: '12-01',
    },
    {
      name: 'Winter',
      status: '12-01',
      status1: '12-01',
      status2: '12-01',
    },
    {
      name: 'Winter',
      status: '12-01',
      status1: '12-01',
      status2: '12-01',
    },
    {
      name: 'Winter',
      status: '12-01',
      status1: '12-01',
      status2: '12-01',
    },
    {
      name: 'Winter',
      status: '12-01',
      status1: '12-01',
      status2: '12-01',
    },
  ];
  return (
    <Paper style={styles.graph}>
      <LinePlot
        x={props.containerWidth / 10}
        y={20}
        width={props.containerWidth}
        height={350}
        data={props.data}
        xValue={value => value.date}
        yValue={value => value.flow}
      />

      <div style={{width: '90%', margin: '0 auto'}}>
        <Table
          height={'290px'}
          fixedHeader={true}
          selectable={true}
          multiSelectable={true}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
            style={{height: '40px', padding: '0px'}}
          >
            <TableRow style={{height: '20px'}}>
              <TableHeaderColumn style={{height: '20px'}}>
                Metric
              </TableHeaderColumn>
              <TableHeaderColumn style={{height: '20px'}}>
                20 Percentille
              </TableHeaderColumn>
              <TableHeaderColumn style={{height: '20px'}}>
                50 Percentille
              </TableHeaderColumn>
              <TableHeaderColumn style={{height: '20px'}}>
                90 Percentille
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={true}
            showRowHover={true}
            stripedRows={false}
          >
            {tableData.map((row, index) => (
              <TableRow
                key={index}
                style={{height: '40px', padding: '0px', cursor: 'pointer'}}
              >
                <TableRowColumn
                  tooltip="The ID"
                  style={{height: '15px', paddingTop: '15px'}}
                >
                  {row.name}
                </TableRowColumn>
                <TableRowColumn style={{height: '15px'}}>
                  {row.status}
                </TableRowColumn>
                <TableRowColumn style={{height: '15px'}}>
                  {row.status1}
                </TableRowColumn>
                <TableRowColumn style={{height: '15px'}}>
                  {row.status2}
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
};

Hydrograph.propTypes = {
  data: PropTypes.array,
  containerWidth: PropTypes.number,
};

const styles = {
  graph: {
    height: '750px',
    width: '100%',
    marginBottom: '20px',
    borderRadius: '0px',
  },
};

export default Hydrograph;
