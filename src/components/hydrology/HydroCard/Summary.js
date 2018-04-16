import React from 'react';
import {Tooltip} from 'react-tippy';
import PropTypes from 'prop-types';
import {pick} from 'lodash';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
} from 'material-ui/Table';

import {metricNameMap} from '../../../constants/classification';

const renderRow = summaryData => {
  if (!summaryData) {
    return null;
  }
  return Object.keys(summaryData).map(key => {
    if (summaryData[key].length === 3 && key !== 'abbreviation') {
      return (
        <TableRow
          key={key}
          style={{height: '40px', padding: '0px', cursor: 'pointer'}}
        >
          <TableRowColumn style={{height: '15px', paddingTop: '15px'}}>
            <Tooltip title={metricNameMap[key]} position="top" arrow={true}>
              {key}
            </Tooltip>
          </TableRowColumn>

          <TableRowColumn style={{height: '15px'}}>
            {summaryData[key][0]}
          </TableRowColumn>
          <TableRowColumn style={{height: '15px'}}>
            {summaryData[key][1]}
          </TableRowColumn>
          <TableRowColumn style={{height: '15px'}}>
            {summaryData[key][2]}
          </TableRowColumn>
        </TableRow>
      );
    }
  });
};

const renderMetrics = (summaryData, title, subtitle, pickedItems) => {
  if (!summaryData) {
    return null;
  }
  return (
    <Card>
      <CardHeader
        title={title}
        subtitle={subtitle}
        actAsExpander={true}
        showExpandableButton={true}
        subtitleStyle={{marginTop: '5px'}}
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
                Metric
              </TableHeaderColumn>
              <TableHeaderColumn style={{height: '20px'}}>
                10 percentile
              </TableHeaderColumn>
              <TableHeaderColumn style={{height: '20px'}}>
                50 percentile
              </TableHeaderColumn>
              <TableHeaderColumn style={{height: '20px'}}>
                90 percentile
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={true}
            showRowHover={true}
            stripedRows={false}
          >
            {renderRow(pick(summaryData, pickedItems))}
          </TableBody>
        </Table>
      </CardText>
    </Card>
  );
};

const Summary = props => {
  return (
    <div style={styles.container}>
      {renderMetrics(
        props.summaryData,
        'All Year',
        'Average, Coefficient of Variation and Standard Deviation',
        ['Avg', 'CV', 'Std']
      )}
      {renderMetrics(
        props.summaryData,
        'Spring Transition',
        'Duration, Magnitude, Rate of Change and Timing',
        ['SP_Dur', 'SP_Mag', 'SP_ROC', 'SP_Tim']
      )}
      {renderMetrics(
        props.summaryData,
        'Summer Baseflow',
        'Duration, Magnitude, No flow days, and Timing',
        [
          'SU_BFL_Dur_Fl',
          'SU_BFL_Dur_Wet',
          'SU_BFL_Mag_10',
          'SU_BFL_Mag_50',
          'SU_BFL_No_Flow',
          'SU_BFL_Tim',
        ]
      )}
      {renderMetrics(
        props.summaryData,
        'Fall Flush',
        'Duration, Magnitude, Timing, and Wet Season Timing',
        ['FAFL_Dur', 'FAFL_Mag', 'FAFL_Tim', 'FAFL_Tim_Wet']
      )}
      {renderMetrics(
        props.summaryData,
        'Winter Highflow',
        'Duration, Frequency and Timing for 5 exceedance rates',
        [
          'WIN_Dur_2',
          'WIN_Dur_5',
          'WIN_Dur_10',
          'WIN_Dur_20',
          'WIN_Dur_50',
          'WIN_Fre_2',
          'WIN_Fre_5',
          'WIN_Fre_10',
          'WIN_Fre_20',
          'WIN_Fre_50',
          'WIN_Tim_2',
          'WIN_Tim_5',
          'WIN_Tim_10',
          'WIN_Tim_20',
          'WIN_Tim_50',
          'Wet_BFL_Mag',
        ]
      )}
    </div>
  );
};

Summary.propTypes = {
  summaryData: PropTypes.object,
};

const styles = {
  container: {
    width: '95%',
    margin: '0 auto',
    marginTop: '15px',
    maxHeight: '580px',
    overflow: 'scroll',
  },
};

export default Summary;
