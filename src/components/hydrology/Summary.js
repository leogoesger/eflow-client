import React from 'react';
import {Tooltip} from 'react-tippy';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
} from 'material-ui/Table';

const Summary = props => {
  return (
    <div style={styles.container}>
      <Table
        height={'270px'}
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
          {props.summaryData.map((row, index) => (
            <TableRow
              key={index}
              style={{height: '40px', padding: '0px', cursor: 'pointer'}}
            >
              <TableRowColumn style={{height: '15px', paddingTop: '15px'}}>
                <Tooltip title="Welcome to React" position="top" arrow={true}>
                  {row.name}
                </Tooltip>
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
  );
};

Summary.propTypes = {
  summaryData: PropTypes.array,
};

const styles = {
  container: {width: '90%', margin: '0 auto', marginTop: '15px'},
};

export default Summary;
