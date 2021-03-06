import React from "react";
import PropTypes from "prop-types";
import { cloneDeep, sortBy } from "lodash";
import { Card, CardHeader, CardText } from "material-ui/Card";
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
} from "material-ui/Table";

import SearchBar from "../../../containers/SearchBar";
import { classInfo } from "../../../constants/classification";

export default class ClassGaugeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classifications: null,
    };
  }

  componentWillMount() {
    this._updateState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._updateState(nextProps);
  }

  _updateState(props) {
    if (!props.classifications) {
      return null;
    }
    const classifications = cloneDeep(sortBy(props.classifications, d => d.id));
    classifications.forEach((classification, index) => {
      classifications[index].gauges = sortBy(classification.gauges, e => e.id);
    });
    this.setState({ classifications });
  }

  selectSearchedRowHandler(gauge) {
    this.props.fetchCurrentGauge(gauge.id);
  }

  _renderRow(gauges) {
    if (!gauges) {
      return null;
    }

    return gauges.map(gauge => {
      return (
        <TableRow
          key={gauge.id}
          style={{ height: "40px", padding: "0px", cursor: "pointer" }}
        >
          <TableRowColumn style={{ height: "15px", paddingTop: "15px" }}>
            {gauge.id}
          </TableRowColumn>

          <TableRowColumn style={{ height: "15px" }}>
            {gauge.stationName}
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  _hoverRow(rowNumber, index) {
    if (rowNumber === 0) {
      return null;
    }

    this.props.updateHoveredGauge(
      this.state.classifications[index].gauges[rowNumber - 1].id
    );
  }

  _selectRow(rowNumber, index, classId) {
    if (rowNumber == 0) {
      return this.props.fetchClassification(classId);
    }
    this.props.fetchCurrentGauge(
      this.state.classifications[index].gauges[rowNumber - 1].id
    );
  }

  _renderClassCard(classes) {
    return sortBy(classes, d => d.id).map((classification, index) => {
      const abbre = classInfo[`class${classification.id}`].abbre;
      const gaugeCount = classification.gauges.length;
      const classId = classification.id;

      return (
        <Card key={classification.id}>
          <CardHeader
            className="tour-metricDetail-class"
            title={`${classification.name} (${abbre})`}
            subtitle={`Gauge Count: ${gaugeCount}`}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <Table
              fixedHeader={true}
              selectable={true}
              multiSelectable={false}
              onRowHover={rowNumber => this._hoverRow(rowNumber, index)}
              onRowSelection={rowNumber =>
                this._selectRow(rowNumber, index, classId)
              }
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
                style={{ height: "40px", padding: "0px" }}
              >
                <TableRow style={{ height: "20px" }}>
                  <TableHeaderColumn style={{ height: "20px" }}>
                    {"ID"}
                  </TableHeaderColumn>
                  <TableHeaderColumn style={{ height: "20px" }}>
                    {"Station Name"}
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={true}
                showRowHover={true}
                stripedRows={false}
              >
                <TableRow
                  style={{ height: "40px", padding: "0px", cursor: "pointer" }}
                >
                  <TableRowColumn
                    style={{ height: "15px", paddingTop: "15px" }}
                  >
                    {`Class ${classification.id}`}
                  </TableRowColumn>

                  <TableRowColumn style={{ height: "15px" }}>
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
    if (!this.state.classifications) {
      return null;
    }
    return (
      <div style={styles.container}>
        <div style={{ padding: "0px 15px 5px 15px" }}>
          <SearchBar
            selectRowHandler={d => this.selectSearchedRowHandler(d)}
            onRowHover={d => this.props.updateHoveredGauge(d)}
          />
        </div>
        {this._renderClassCard(this.state.classifications)}
      </div>
    );
  }
}

ClassGaugeList.propTypes = {
  fetchClassification: PropTypes.func,
  classifications: PropTypes.array,
  updateHoveredGauge: PropTypes.func,
  fetchCurrentGauge: PropTypes.func,
};

const styles = {
  container: {
    maxHeight: "650px",
    overflow: "scroll",
  },
};
