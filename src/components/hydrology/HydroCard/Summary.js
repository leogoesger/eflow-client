import React from 'react';
import { Tooltip } from 'react-tippy';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
} from 'material-ui/Table';

import { getCalenderDateFromJulian } from '../../../utils/helpers';

import { metricNameMap } from '../../../constants/classification';

const renderRow = summaryData => {
  if (!summaryData) {
    return null;
  }
  return Object.keys(summaryData).map(key => {
    if (summaryData[key] !== null) {
      if (summaryData[key].length === 3 && key !== 'abbreviation') {
        return (
          <TableRow
            key={key}
            style={{ height: '40px', padding: '0px', cursor: 'pointer' }}
          >
            <TableRowColumn style={{ height: '15px', paddingTop: '15px' }}>
              <Tooltip title={metricNameMap[key]} position="top" arrow={true}>
                {key}
              </Tooltip>
            </TableRowColumn>

            <TableRowColumn style={{ height: '15px' }}>
              <Tooltip title={metricNameMap[key]} position="top" arrow={true}>
                {metricNameMap[key].includes('Timing')
                  ? getCalenderDateFromJulian(Math.floor(summaryData[key][0]))
                  : summaryData[key][0]}
              </Tooltip>
            </TableRowColumn>

            <TableRowColumn style={{ height: '15px' }}>
              <Tooltip title={metricNameMap[key]} position="top" arrow={true}>
                {metricNameMap[key].includes('Timing')
                  ? getCalenderDateFromJulian(Math.floor(summaryData[key][1]))
                  : summaryData[key][1]}
              </Tooltip>
            </TableRowColumn>

            <TableRowColumn style={{ height: '15px' }}>
              <Tooltip title={metricNameMap[key]} position="top" arrow={true}>
                {metricNameMap[key].includes('Timing')
                  ? getCalenderDateFromJulian(Math.floor(summaryData[key][2]))
                  : summaryData[key][2]}
              </Tooltip>
            </TableRowColumn>
          </TableRow>
        );
      }
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
        subtitleStyle={{ marginTop: '5px' }}
      />
      <CardText expandable={true}>
        <Table fixedHeader={true} selectable={true} multiSelectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
            style={{ height: '40px', padding: '0px' }}
          >
            <TableRow style={{ height: '20px' }}>
              <TableHeaderColumn style={{ height: '20px' }}>
                Metric
              </TableHeaderColumn>
              <TableHeaderColumn style={{ height: '20px' }}>
                10 percentile
              </TableHeaderColumn>
              <TableHeaderColumn style={{ height: '20px' }}>
                50 percentile
              </TableHeaderColumn>
              <TableHeaderColumn style={{ height: '20px' }}>
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
        'Annual Metrics',
        'Average, Coefficient of Variation and Standard Deviation',
        ['Avg', 'CV', 'Std']
      )}
      {renderMetrics(
        props.summaryData,
        'Spring Recession',
        'Duration, Magnitude, Rate of Change and Timing',
        ['SP_Dur', 'SP_Mag', 'SP_ROC', 'SP_Tim']
      )}
      {renderMetrics(
        props.summaryData,
        'Dry Season Low Flows',
        'Duration, Magnitude, No flow days, and Timing',
        [
          'DS_Dur_Fl',
          'DS_Dur_WS',
          'DS_Mag_10',
          'DS_Mag_50',
          'DS_No_Flow',
          'DS_Tim',
        ]
      )}
      {renderMetrics(
        props.summaryData,
        'Fall Flush',
        'Duration, Magnitude, Timing, and Wet Season Timing',
        ['WSI_Dur', 'WSI_Mag', 'WSI_Tim', 'Wet_Tim']
      )}
      {renderMetrics(
        props.summaryData,
        'Peak Magnitude High Flows',
        'Duration, Frequency and Timing for 5 exceedance rates',
        [
          'Peak_Mag_2',
          'Peak_Mag_5',
          'Peak_Mag_10',
          'Peak_Mag_20',
          'Peak_Mag_50',
          'Peak_Dur_2',
          'Peak_Dur_5',
          'Peak_Dur_10',
          'Peak_Dur_20',
          'Peak_Dur_50',
          'Peak_Fre_2',
          'Peak_Fre_5',
          'Peak_Fre_10',
          'Peak_Fre_20',
          'Peak_Fre_50',
          'Peak_Tim_2',
          'Peak_Tim_5',
          'Peak_Tim_10',
          'Peak_Tim_20',
          'Peak_Tim_50',
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
