import React from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem } from "material-ui";

import Hydrograph from "./Hydrograph";
import Divider from "material-ui/Divider";
import Book from "material-ui/svg-icons/av/library-books";
import Chart from "material-ui/svg-icons/editor/show-chart";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadDRH: true,
    };
  }

  _updateHoverGauge(gaugeId) {
    this.props.updateHoveredGauge(
      this.props.gauges.find(gauge => gauge.id === gaugeId)
    );
  }

  onClickHandler(e) {
    const resetStates = {
      loadDRH: false,
    };

    resetStates[e] = true;

    this.setState(resetStates);
  }

  _handleChange(v, field) {
    if (field === "classId") {
      return this.setState({ [field]: v + 1 });
    }
    return this.setState({ [field]: v });
  }

  renderClicked(clicked) {
    if (clicked.loadDRH) {
      return (
        <Hydrograph
          data={this.props.data}
          fetchCurrentGauge={this.props.fetchCurrentGauge}
          gauges={this.props.gauges}
          currentGauge={this.props.currentGauge}
          currentClassification={this.props.currentClassification}
          removeClassGaugeProps={this.props.removeClassGaugeProps}
          classifications={this.props.classifications}
          fetchClassification={this.props.fetchClassification}
          updateHoveredGauge={gaugeId => this._updateHoverGauge(gaugeId)}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <div style={styles.banner} />
        <div style={styles.paperStyle}>
          <div
            style={{
              width: "20%",
            }}
          >
            <Menu>
              <MenuItem
                primaryText={this.props.data.name}
                value={0}
                leftIcon={<Book />}
              />
              <Divider style={{ width: "98%" }} />
              <MenuItem
                primaryText="DRH"
                leftIcon={<Chart />}
                onClick={() => this.onClickHandler("loadDRH")}
              />
            </Menu>
          </div>

          <div
            style={{
              width: "80%",
              margin: "0 auto",
              boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px",
            }}
          >
            <div
              style={{
                width: "90%",
                margin: "30px auto",
                position: "relative",
              }}
            >
              {this.renderClicked(this.state)}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  data: PropTypes.object,
  currentClassification: PropTypes.object,
  currentGauge: PropTypes.object,
  gauges: PropTypes.array,
  fetchCurrentGauge: PropTypes.func,
  removeClassGaugeProps: PropTypes.func,
  classifications: PropTypes.array,
  fetchClassification: PropTypes.func,
  updateHoveredGauge: PropTypes.func,
};

const styles = {
  banner: {
    backgroundColor: "#424242",
    height: "230px",
    zIndex: "0",
  },
  paperStyle: {
    display: "flex",
    justifyContent: "space-around",
    height: "100%",
    margin: "-60px auto 100px auto",
    backgroundColor: "white",
    width: "1100px",
    zIndex: "2",
    overflow: "scroll",
  },
};

export default Layout;
