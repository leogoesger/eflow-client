import React from "react";
import PropTypes from "prop-types";
//import Checkbox from "material-ui/Checkbox";
import { find } from "lodash";
import FlatButton from "material-ui/FlatButton";

import Sidebar from "./Sidebar";
import { metricReference } from "../../../constants/metrics";
import { Colors } from "../../../styles";
import Setting from "material-ui/svg-icons/action/settings";

var curCond = "ALL";

export default class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    metricReference.forEach(metric => {
      if (metric.isBoxplotOverlay) {
        this.state[metric.name] = false; // eslint-disable-line
      }
    });
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  componentWillReceiveProps(nextProps) {
    if (
      Boolean(
        this.props.currentClassification &&
          this.props.currentClassification.id !==
            nextProps.currentClassification.id
      ) ||
      Boolean(
        this.props.currentGauge &&
          this.props.currentGauge.id !== nextProps.currentGauge.id
      )
    ) {
      this.resetStates();
    }
  }

  componentWillUnmount() {
    //Reset all boxplot data to null
    this.resetStates("ALL", true);
  }

  resetStates(condition, willMount) {
    let condChanged = false;

    if (curCond && curCond !== condition) {
      condChanged = true;
      curCond = condition;
    } else curCond = condition;

    if (willMount || condChanged) {
      Object.keys(this.state).forEach(key => {
        if (key !== "open") {
          const currentMetric = find(metricReference, m => m.name == key);

          this.props.overLayBoxPlotMethods[
            currentMetric.boxPlotOverLayMethods[1]
          ]({
            type: currentMetric.name,
          });
          //this.setState({ [key]: false });

          if (this.state[key] && condChanged) {
            this.fetchMetricData(currentMetric, condition);
          }
        }
      });
    }
  }

  fetchMetricData(currentMetric, condition) {
    const currentType = this.props.currentGauge
      ? { type: "gaugeId", id: this.props.currentGauge.id }
      : { type: "classId", id: this.props.currentClassification.id };

    return this.props.overLayBoxPlotMethods[
      currentMetric.boxPlotOverLayMethods[0]
    ]({
      fetchData: {
        [currentType.type]: currentType.id,
        metric: currentMetric.columnName,
        condition: condition === "ALL" ? null : condition,
      },
      type: currentMetric.name,
    });
  }

  _toggleCheckBox(metricObject, condition) {
    this.setState({ [metricObject.name]: !this.state[metricObject.name] });

    if (!this.state[metricObject.name]) {
      this.fetchMetricData(metricObject, condition);

      // return this.props.overLayBoxPlotMethods[
      //   metricObject.boxPlotOverLayMethods[0]
      // ]({
      //   fetchData: {
      //     [currentType.type]: currentType.id,
      //     metric: metricObject.columnName,
      //     condition: condition === "ALL" ? null : condition,
      //   },
      //   type: metricObject.name,
      // });
    } else {
      return this.props.overLayBoxPlotMethods[
        metricObject.boxPlotOverLayMethods[1]
      ]({
        type: metricObject.name,
      });
    }
  }

  // _getDisplay(name) {
  //   if (name.length > 20) {
  //     return name.slice(0, 15);
  //   }
  //   return name;
  // }

  // _renderCheckBox() {
  //   return metricReference.map(metricObject => {
  //     if (metricObject.isBoxplotOverlay) {
  //       return (
  //         <Checkbox
  //           key={metricObject.name}
  //           checked={this.state[metricObject.name]}
  //           label={this._getDisplay(metricObject.display)}
  //           style={styles.checkbox}
  //           labelStyle={styles.labelStyle}
  //           iconStyle={{ width: "16px", fill: metricObject.colors[0] }}
  //           onClick={() => this._toggleCheckBox(metricObject)}
  //         />
  //       );
  //     }
  //   });
  // }

  render() {
    return (
      <div>
        <FlatButton
          className="tour-metricDetail-display"
          label="Display"
          disabled={false}
          labelStyle={{ fontSize: "12px", color: Colors.gold }}
          style={{ margin: "10px 10px 10px 0px" }}
          icon={<Setting color={Colors.gold} />}
          onClick={() => this.handleToggle()}
        />
        <Sidebar
          open={this.state.open}
          toggleMetric={(metricObject, condition) =>
            this._toggleCheckBox(metricObject, condition)
          }
          toggledMetrics={this.state}
          toggleDrawer={() => this.handleToggle()}
          toggleMinMax={() => this.props.toggleMinMax()}
          minMax={this.props.minMax}
          resetStates={e => this.resetStates(e)}
        />
      </div>
    );
  }
}

Control.propTypes = {
  currentClassification: PropTypes.object,
  overLayBoxPlotMethods: PropTypes.object,
  currentGauge: PropTypes.object,
  toggleMinMax: PropTypes.func.isRequired,
  minMax: PropTypes.bool.isRequired,
};

// const styles = {
//   btnContainer: {
//     margin: "0px auto",
//     width: "95%",
//     position: "relative",
//   },
//   rightBtn: {
//     position: "absolute",
//     right: "0px",
//     bottom: "-60px",
//     width: "350px",
//     height: "36px",
//   },
//   checkBoxContainer: {
//     width: "60%",
//     marginLeft: "20px",
//   },
//   labelStyle: {
//     color: Colors.offBlack,
//     fontSize: "12px",
//   },
// };
