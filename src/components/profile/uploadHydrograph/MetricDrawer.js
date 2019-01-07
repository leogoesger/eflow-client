import React from "react";
import PropTypes from "prop-types";

import SearchBar from "../../../containers/SearchBar";
import {
  Drawer,
  Toggle,
  Divider,
  RadioButton,
  RadioButtonGroup,
  RaisedButton,
  DropDownMenu,
  MenuItem,
} from "material-ui";

import Clear from "material-ui/svg-icons/content/clear";
import { Colors } from "../../../styles";

import { classInfo } from "../../../constants/classification";

class MetricDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compare: "",
      value: 0,
    };
  }

  handleRadioButton(btn) {
    this.setState({
      compare: btn,
    });
  }

  _renderGeneralToggleBtns() {
    const percentileMap = {
      ten: "10th",
      twenty_five: "25th",
      fifty: "50th",
      seventy_five: "75th",
      ninty: "90th",
      min: "Min",
      max: "Max",
      overlay: "Overlay",
    };
    return (
      <div style={{ padding: "15px" }}>
        {Object.keys(this.props.plots)
          .filter(plot => plot !== "overlay")
          .map((cent, indx) => {
            return (
              <span key={indx} onClick={() => this.props.handleToggle(cent)}>
                <Toggle
                  label={percentileMap[cent]}
                  toggled={this.props.plots[cent]}
                  labelStyle={styles.labelStyle}
                />
              </span>
            );
          })}

        <Divider style={{ marginTop: "10px" }} />

        {this.props.currentGauge || this.props.currentClassification ? (
          <Toggle
            label={"Hydrograph Overlay"}
            labelStyle={styles.labelStyle}
            value={"empty"}
            onClick={() => this.props.handleToggle("overlay")}
            toggled={this.props.plots["overlay"]}
          />
        ) : null}

        <RaisedButton
          label="Close"
          backgroundColor={Colors.gold}
          labelColor={Colors.white}
          labelStyle={{ fontSize: "12px" }}
          icon={<Clear color={Colors.white} />}
          onClick={() => this.props.closeDrawer(false)}
          style={{ margin: "20px auto 5px 85px" }}
        />
      </div>
    );
  }

  renderCompare() {
    return (
      <div>
        <div style={{ padding: "15px" }}>
          <h1
            style={{
              display: "inline",
              ...styles.compareStyle,
            }}
          >
            Compare With:
          </h1>
          <RadioButtonGroup
            name="compare"
            valueSelected={this.state.compare}
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "15px 0px 15px 0px",
            }}
          >
            <RadioButton
              value="class"
              label="Class"
              labelStyle={styles.compareStyle}
              onClick={() => {
                this.handleRadioButton("class");
              }}
            />
            <RadioButton
              value="gauge"
              label="Gauge"
              labelStyle={styles.compareStyle}
              onClick={() => {
                this.handleRadioButton("gauge");
              }}
            />
          </RadioButtonGroup>
          {this.state.compare ? (
            <React.Fragment>
              <Divider />
              {this.state.compare === "class"
                ? this.renderClassSelector()
                : this.renderGaugeSelector()}
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }

  handleChange(value) {
    this.setState({ value });
    this.props.handleToggle("OVERLAY");
    this.props.fetchClassification(value);
  }

  renderClassSelector() {
    return (
      <div style={{ height: "72px" }}>
        <DropDownMenu
          value={this.state.value}
          onChange={(e, indx, val) => this.handleChange(val)}
          openImmediately={true}
          labelStyle={styles.compareStyle}
          menuItemStyle={styles.compareStyle}
          underlineStyle={{ margin: "auto", bottom: "-8px" }}
          autoWidth={false}
          style={{ width: "275px" }}
        >
          <MenuItem value={0} primaryText="Class List" disabled={true} />
          {Object.keys(classInfo).map((val, indx) => {
            return (
              <MenuItem
                key={indx + val}
                value={indx + 1}
                primaryText={`${indx + 1}: ${classInfo[val].abbre} -${
                  classInfo[val].fullName
                }`}
              />
            );
          })}
        </DropDownMenu>
      </div>
    );
  }

  renderGaugeSelector() {
    return (
      <SearchBar
        selectRowHandler={d => this.selectSearchedRowHandler(d)}
        onRowHover={d => this.props.updateHoveredGauge(d)}
      />
    );
  }

  selectSearchedRowHandler(gauge) {
    this.props.handleToggle("OVERLAY");
    this.props.fetchCurrentGauge(gauge.id);
  }

  render() {
    return (
      <Drawer
        containerStyle={styles.container}
        docked={true}
        width={301}
        overlayStyle={styles.overlay}
        openSecondary={true}
        open={this.props.isDrawerOpen}
        onRequestChange={() => this.props.closeDrawer(false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "96%",
          }}
        >
          {this.renderCompare()}

          {this._renderGeneralToggleBtns()}
        </div>
      </Drawer>
    );
  }
}

MetricDrawer.propTypes = {
  isDrawerOpen: PropTypes.bool,
  closeDrawer: PropTypes.func,
  handleToggle: PropTypes.func,
  plots: PropTypes.object,
  currentGauge: PropTypes.object,
  currentClassification: PropTypes.object,
  fetchClassification: PropTypes.func,
  classifications: PropTypes.array,
  updateHoveredGauge: PropTypes.func,
  fetchCurrentGauge: PropTypes.func,
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

MetricDrawer.defaultProps = {
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
  compareStyle: {
    color: Colors.grey,
    fontSize: "14px",
  },
};

export default MetricDrawer;
