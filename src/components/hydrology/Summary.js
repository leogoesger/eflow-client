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
          {Object.keys(props.summaryData).map(key => {
            if (props.summaryData[key].length === 3) {
              return (
                <TableRow
                  key={key}
                  style={{height: '40px', padding: '0px', cursor: 'pointer'}}
                >
                  <TableRowColumn style={{height: '15px', paddingTop: '15px'}}>
                    <Tooltip title={key} position="top" arrow={true}>
                      {key}
                    </Tooltip>
                  </TableRowColumn>

                  <TableRowColumn style={{height: '15px'}}>
                    {props.summaryData[key][0]}
                  </TableRowColumn>
                  <TableRowColumn style={{height: '15px'}}>
                    {props.summaryData[key][1]}
                  </TableRowColumn>
                  <TableRowColumn style={{height: '15px'}}>
                    {props.summaryData[key][2]}
                  </TableRowColumn>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </div>
  );
};

Summary.propTypes = {
  summaryData: PropTypes.object,
};

const styles = {
  container: {width: '90%', margin: '0 auto', marginTop: '15px'},
};

export default Summary;