import React from "react";
import PropTypes from "prop-types";

import Drawer from "material-ui/Drawer";
import Toggle from "material-ui/Toggle";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import Clear from "material-ui/svg-icons/content/clear";
import ClassGaugeList from "../../hydrology/HydroCard/ClassGaugeList";
import { Colors } from "../../../styles";

class MetricDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                  style={styles.track}
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
        width={385}
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
          <ClassGaugeList
            fetchClassification={this.props.fetchClassification}
            classifications={this.props.classifications}
            updateHoveredGauge={this.props.updateHoveredGauge}
            fetchCurrentGauge={this.props.fetchCurrentGauge}
          />

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
};

export default MetricDrawer;
