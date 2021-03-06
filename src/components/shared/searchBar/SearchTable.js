import React from "react";
import PropTypes from "prop-types";
import Highlight from "react-highlighter";

import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
} from "material-ui/Table";
import { Card } from "material-ui/Card";
import { classInfo } from "../../../constants/classification";

export default class SearchTable extends React.Component {
  getColumnName(name) {
    if (name.length > 16) {
      return `${name.slice(0, 16)} ...`;
    }
    return name;
  }

  _selectRow(e) {
    const gauge = this.props.searchedGauges[e];
    this.props.selectRowHandler(gauge);
    this.props.onSelect("");
  }

  _hoverRow(rowNumber) {
    this.props.onRowHover(this.props.searchedGauges[rowNumber].id);
  }

  _renderRow(gauges) {
    return gauges.map(gauge => {
      return (
        <TableRow key={gauge.id} style={{ cursor: "pointer", height: "35px" }}>
          <TableRowColumn style={{ height: "35px", width: "25%" }}>
            <div style={styles.column}>
              <Highlight matchElement={"span"} search={this.props.keyWord}>
                {gauge.id.toString()}
              </Highlight>
            </div>
          </TableRowColumn>
          <TableRowColumn style={{ height: "35px", width: "15%" }}>
            <div style={styles.column}>
              {classInfo[`class${gauge.classId}`].abbre}
            </div>
          </TableRowColumn>
          <TableRowColumn style={{ height: "35px", width: "50%" }}>
            <div style={styles.column}>
              <Highlight matchElement={"span"} search={this.props.keyWord}>
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
          onRowHover={rowNumber => this._hoverRow(rowNumber)}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow style={{ height: "35px" }}>
              <TableHeaderColumn style={{ height: "35px", width: "25%" }}>
                <div style={styles.column}>{"ID"}</div>
              </TableHeaderColumn>
              <TableHeaderColumn style={{ height: "35px", width: "15%" }}>
                <div style={styles.column}>{"Class"}</div>
              </TableHeaderColumn>
              <TableHeaderColumn style={{ height: "35px", width: "50%" }}>
                <div style={styles.column}>{"Station Name"}</div>
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
  keyWord: PropTypes.string,
  selectRowHandler: PropTypes.func,
  onSelect: PropTypes.func,
  onRowHover: PropTypes.func,
};

const styles = {
  column: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
};
