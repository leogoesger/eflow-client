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
          gauge={this.props.gauge}
          currentGauge={this.props.currentGauge}
          currentClassification={this.props.currentClassification}
          removeClassGaugeProps={this.props.removeClassGaugeProps}
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
              width: "15%",
              float: "left",
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
              width: "83%",
              float: "right",
              borderLeft: "1px solid rgb(224,224,224)",
              height: "inherit",
            }}
          >
            <div style={{ width: "90%", margin: "auto" }}>
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
  gauge: PropTypes.array,
  fetchCurrentGauge: PropTypes.func,
  removeClassGaugeProps: PropTypes.func,
};

const styles = {
  banner: {
    backgroundColor: "#424242",
    height: "230px",
    zIndex: "0",
  },
  paperStyle: {
    height: "auto",
    margin: "-60px auto 160px auto",
    backgroundColor: "white",
    width: "1000px",
    zIndex: "2",
    overflow: "scroll",
  },
};

export default Layout;
