import React from "react";
import PropTypes from "prop-types";
import { uniqBy, some, cloneDeep } from "lodash";
import TextField from "material-ui/TextField";
import Drawer from "material-ui/Drawer";
import Toggle from "material-ui/Toggle";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";

import Clear from "material-ui/svg-icons/content/clear";
import Save from "material-ui/svg-icons/content/save";

import { Card, CardHeader, CardText } from "material-ui/Card";
import { metricReference } from "../../constants/metrics";

import Styles from "../../styles/Styles";
import { Colors } from "../../styles";

class MetricGaugeDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentile: 0.98,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fixedYaxis) {
      this.setState({ percentile: nextProps.fixedYaxis });
    }
  }

  _getTableNames(data) {
    return uniqBy(data, d => d.displayTableName);
  }

  _checkToggleStatus(keyWord, all) {
    let filteredMetrics;

    // Filter all the metrics contain the display keyWord
    // all params handle the case for FALL TIMING, FALL TIMING WET.
    // includes will get both of them when used
    if (all) {
      filteredMetrics = metricReference.filter(
        metric => metric.display.includes(keyWord) && !metric.hidden
      );
    } else {
      filteredMetrics = metricReference.filter(
        metric => metric.display === keyWord && !metric.hidden
      );
    }

    // Check each one of the metrics has a counter part
    return filteredMetrics.every(filteredMetric =>
      some(this.props.toggledMetrics, filteredMetric)
    );
  }

  _handleToggle(keyWord, all, status) {
    let filteredMetrics;
    if (all) {
      filteredMetrics = metricReference.filter(
        metric => metric.display.includes(keyWord) && !metric.hidden
      );
    } else {
      filteredMetrics = metricReference.filter(
        metric => metric.display === keyWord && !metric.hidden
      );
    }

    const currentMetrics = cloneDeep(this.props.toggledMetrics);
    filteredMetrics.forEach(filteredMetric => {
      if (some(currentMetrics, filteredMetric)) {
        if (status === false) {
          return;
        }
        const index = currentMetrics
          .map(d => d.display)
          .indexOf(filteredMetric.display);
        currentMetrics.splice(index, 1);
      } else {
        currentMetrics.push(filteredMetric);
      }
    });
    this.props.toggleAnnualFlowMetrics(currentMetrics);
  }

  _getDisplay(name) {
    if (name.length > 30) {
      return name.slice(0, 30);
    }
    return name;
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
            onClick={() => this._handleToggle(metric.display)}
            toggled={this._checkToggleStatus(metric.display)}
          />
        );
      }
    });
  }

  getErrorMessage(percentile) {
    if (
      isNaN(percentile) ||
      percentile >= 1 ||
      percentile <= 0 ||
      !percentile
    ) {
      return "Value needs to be between 0 to 1";
    }
  }

  _handleFixedYaxis(value) {
    this.props.handleFixedYaxis(value);
    if (value) {
      this.props.getYaxisMax(this.props.currentGaugeId, value);
    }
  }

  _renderGeneralToggleBtns() {
    const generalList = [
      { label: "All Timing Metrics", keyWord: "Timing" },
      // {label: 'All Duration Metrics', keyWord: 'Duration'},
      { label: "All Magnitude Metrics", keyWord: "Magnitude" },
    ];
    return (
      <div style={{ padding: "15px" }}>
        {generalList.map(item => {
          return (
            <Toggle
              key={item.keyWord}
              label={item.label}
              labelStyle={styles.labelStyle}
              value={"empty"}
              onClick={() =>
                this._handleToggle(
                  item.keyWord,
                  "true",
                  this._checkToggleStatus(item.keyWord, "true")
                )
              }
              toggled={this._checkToggleStatus(item.keyWord, "true")}
            />
          );
        })}

        <Divider style={{ marginTop: "10px" }} />
        <Toggle
          label={"Log Scale"}
          labelStyle={styles.labelStyle}
          value={"empty"}
          onClick={() => this.props.handleToggleLogScale(!this.props.logScale)}
          toggled={this.props.logScale}
          style={{ marginTop: "10px" }}
        />
        <Toggle
          label={"Fixed Y-axis"}
          labelStyle={styles.labelStyle}
          value={"empty"}
          onClick={() =>
            this._handleFixedYaxis(this.props.fixedYaxis ? null : 0.98)
          }
          toggled={Boolean(this.props.fixedYaxis)}
        />
        {this.props.fixedYaxis ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "14px",
            }}
          >
            <TextField
              className="requiredField"
              onFocus={() => this.setState({ focused: true })}
              value={this.state.percentile}
              fullWidth={true}
              errorText={this.getErrorMessage(this.state.percentile)}
              errorStyle={{ textAlign: "left" }}
              floatingLabelText="Y-axis Percentile"
              underlineFocusStyle={Styles.underlineFocusStyle}
              floatingLabelStyle={Styles.floatingLabelStyle}
              floatingLabelFocusStyle={Styles.floatingLabelFocusStyle}
              onChange={(_event, value) => this.setState({ percentile: value })}
              onBlur={() => this._handleFixedYaxis(this.state.percentile)}
              onKeyPress={ev => {
                if (ev.key === "Enter") {
                  this._handleFixedYaxis(this.state.percentile);
                }
              }}
            />
            <Save
              onClick={() => this._handleFixedYaxis(this.state.percentile)}
              style={{
                marginTop: "40px",
                cursor:
                  this.getErrorMessage(this.state.percentile) ||
                  this.props.fixedYaxis === this.state.percentile
                    ? "not-allowed"
                    : "pointer",
              }}
              disabled={this.getErrorMessage(this.state.percentile)}
              color={
                this.getErrorMessage(this.state.percentile) ||
                this.props.fixedYaxis === this.state.percentile
                  ? "#bdbdbd"
                  : Colors.blue
              }
            />
          </div>
        ) : null}

        <Toggle
          label={"Hydrograph Overlay"}
          labelStyle={styles.labelStyle}
          value={"empty"}
          onClick={() =>
            this.props.handleHydrographOverlay(!this.props.isHydrographOverlay)
          }
          toggled={this.props.isHydrographOverlay}
        />

        <RaisedButton
          label="Close"
          backgroundColor={Colors.gold}
          labelColor={Colors.white}
          labelStyle={{ fontSize: "12px" }}
          icon={<Clear color={Colors.white} />}
          onClick={() => this.props.toggleMetricGaugeDrawer(false)}
          style={{ margin: "20px auto 5px 50px" }}
        />
      </div>
    );
  }

  render() {
    return (
      <Drawer
        containerStyle={styles.container}
        docked={true}
        width={250}
        overlayStyle={styles.overlay}
        openSecondary={true}
        open={this.props.isDrawerOpen}
        onRequestChange={() => this.props.toggleMetricGaugeDrawer(false)}
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
          {this._renderGeneralToggleBtns()}
        </div>
      </Drawer>
    );
  }
}

MetricGaugeDrawer.propTypes = {
  isDrawerOpen: PropTypes.bool,
  toggleMetricGaugeDrawer: PropTypes.func,
  toggledMetrics: PropTypes.array,
  logScale: PropTypes.bool,
  toggleAnnualFlowMetrics: PropTypes.func,
  handleToggleLogScale: PropTypes.func,
  handleHydrographOverlay: PropTypes.func,
  handleFixedYaxis: PropTypes.func,
  isHydrographOverlay: PropTypes.bool,
  fixedYaxis: PropTypes.number,
  currentGaugeId: PropTypes.number,
  getYaxisMax: PropTypes.func,
};

MetricGaugeDrawer.defaultProps = {
  toggledMetrics: [],
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
  },
};

export default MetricGaugeDrawer;
