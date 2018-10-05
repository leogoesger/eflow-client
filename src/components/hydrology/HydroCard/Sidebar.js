import React from "react";
import PropTypes from "prop-types";
import {
  RaisedButton,
  SelectField,
  Drawer,
  Toggle,
  MenuItem,
} from "material-ui";
import { Card, CardHeader, CardText } from "material-ui/Card";
import Clear from "material-ui/svg-icons/content/clear";

import { uniqBy } from "lodash";

import { metricReference } from "../../../constants/metrics";
import { conditionTypes } from "../../../constants/conditionTypes";
import { Colors } from "../../../styles";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.props.resetStates(conditionTypes[index].toUpperCase());
    this.setState({ value });
  }

  _getDisplay(name) {
    if (name.length > 30) {
      return name.slice(0, 30);
    }
    return name;
  }

  _getTableNames(data) {
    return uniqBy(data, d => d.displayTableName);
  }

  _renderTables() {
    const tableNames = this._getTableNames(metricReference);
    return tableNames.map(table => {
      if (table.displayTableName !== "Annual") {
        return (
          <Card key={table.displayTableName}>
            <CardHeader
              title={table.displayTableName}
              titleStyle={{ width: "200px" }}
              actAsExpander={true}
              showExpandableButton={true}
              subtitleStyle={{ paddingTop: "3px" }}
            />

            <CardText expandable={true}>
              {this._renderTableItems(table.displayTableName)}
            </CardText>
          </Card>
        );
      }
    });
  }

  _renderTableItems(tableName) {
    const metrics = metricReference.filter(
      metric =>
        metric.displayTableName == tableName &&
        metric.dimUnit !== "none" &&
        metric.dimUnit !== "%"
    );
    return metrics.map(metric => {
      if (
        (!metric.hidden && metric.dimUnit === "cfs") ||
        (metric.dimUnit === "Date" && !metric.hidden)
      ) {
        return (
          <Toggle
            key={metric.name}
            label={this._getDisplay(metric.display)}
            labelStyle={styles.labelStyle}
            value={"empty"}
            thumbSwitchedStyle={{
              size: "1",
              backgroundColor: metric.colors[0],
            }}
            trackSwitchedStyle={{ backgroundColor: metric.colors[1] }}
            style={{ padding: "1px 5px 1px 5px" }}
            onClick={() =>
              this.props.toggleMetric(
                metric,
                conditionTypes[this.state.value].toUpperCase()
              )
            }
            toggled={this.props.toggledMetrics[metric.name]}
          />
        );
      }
    });
  }

  render() {
    const { open } = this.props;
    return (
      <Drawer
        width={250}
        openSecondary={true}
        open={open}
        docked={true}
        containerStyle={{ marginTop: "15px", paddingTop: "45px" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "96%",
          }}
        >
          <div>{this._renderTables()}</div>
          <div>
            <SelectField
              floatingLabelText="Condition"
              value={this.state.value}
              onChange={this.handleChange}
              style={{
                width: "86%",
                margin: "10px 10px",
                color: Colors.grey,
                fontSize: "12px",
              }}
            >
              {conditionTypes.map((cond, indx) => {
                return <MenuItem key={indx} value={indx} primaryText={cond} />;
              })}
            </SelectField>
            <Toggle
              label={"Min/Max"}
              labelStyle={styles.labelStyle}
              value={"empty"}
              onClick={this.props.toggleMinMax}
              toggled={this.props.minMax}
              style={{ width: "90%", margin: "4px auto" }}
            />

            <RaisedButton
              label="Close"
              backgroundColor={Colors.gold}
              labelColor={Colors.white}
              labelStyle={{ fontSize: "12px" }}
              icon={<Clear color={Colors.white} />}
              onClick={this.props.toggleDrawer}
              style={{ margin: "20px auto 5px 50px" }}
            />
          </div>
        </div>
      </Drawer>
    );
  }
}

export default Sidebar;

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleMetric: PropTypes.func.isRequired,
  toggledMetrics: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  toggleMinMax: PropTypes.func.isRequired,
  minMax: PropTypes.bool.isRequired,
  resetStates: PropTypes.func.isRequired,
};

const styles = {
  container: {
    top: "60px",
    zIndex: "10",
    height: "94%",
  },
  overlay: {
    top: "60px",
    zIndex: "10",
  },
  labelStyle: {
    color: Colors.grey,
    fontSize: "12px",
    width: "150px",
  },
};
