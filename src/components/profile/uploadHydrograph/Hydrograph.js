import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { Paper, Divider, RaisedButton } from "material-ui";
import { CardHeader } from "material-ui/Card";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Setting from "material-ui/svg-icons/action/settings";
import Compare from "material-ui/svg-icons/action/compare-arrows";

import { LinePlot } from "../../shared/plots";
import { classInfo } from "../../../constants/classification";

import { Colors } from "../../../styles";
import MetricDrawer from "./MetricDrawer";

const colors = {
  NINTY: Colors.NINTY,
  SEVENTYFIVE: Colors.SEVENTYFIVE,
  FIFTY: Colors.FIFTY,
  TWENTYFIVE: Colors.TWENTYFIVE,
  TEN: Colors.TEN,
  MAX: Colors.MAX,
  MIN: Colors.MIN,
};

class Hydrograph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hydroData: null,
      hydroUploadData: null,
      hydroCompareData: null,
      fallFlushTiming: false,
      fallWetTiming: false,
      springTiming: false,
      summerTiming: false,
      zoomTransform: null,
      plots: {
        overlay: false,
        min: false,
        max: false,
        ninty: true,
        seventy_five: true,
        fifty: true,
        twenty_five: true,
        ten: true,
      },
      openDrawer: false,
    };
    this.zoom = d3
      .zoom()
      .scaleExtent([-10, 10])
      .translateExtent([[-100, -100], [700 + 100, 420 + 100]])
      .extent([[-100, -100], [700 + 100, 420 + 100]])
      .on("zoom", () => this.zoomed());
  }

  componentDidMount() {
    d3.select(this.svg).call(this.zoom);
    if (this.props.currentGauge || this.props.currentClassification)
      this.handleToggle("overlay");
    this._setHydrographUploadData();
  }

  componentDidUpdate() {
    d3.select(this.svg).call(this.zoom);
  }

  zoomed() {
    this.setState({
      zoomTransform: d3.event.transform,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentGauge || nextProps.currentClassification) {
      this._setHydrographUploadData();
    }
  }

  _renderTitleInfo() {
    if (this.props.currentGauge) {
      return this._renderGaugeInfo();
    } else if (this.props.currentClassification) {
      return this._renderClassInfo();
    } else {
      return null;
    }
  }

  _renderGaugeInfo() {
    const currentGaugeClass =
      classInfo[`class${this.props.currentGauge.classId}`];
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CardHeader
            title={this.props.currentGauge.stationName}
            subtitle={`ID: ${this.props.currentGauge.id}, Class: ${
              currentGaugeClass.fullName
            }`}
            subtitleColor={currentGaugeClass.colors[0]}
            actAsExpander={false}
            showExpandableButton={false}
            style={{ padding: "15px 0px 15px 10px" }}
          />
        </div>
        <Divider />
      </div>
    );
  }

  _renderClassInfo() {
    const currentClass =
      classInfo[`class${this.props.currentClassification.id}`];
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CardHeader
            title={this.props.currentClassification.name}
            titleColor={currentClass.colors[0]}
            subtitle={`ID: ${this.props.currentClassification.id}`}
            actAsExpander={false}
            showExpandableButton={false}
            style={{ padding: "15px 0px 15px 10px" }}
          />
        </div>
        <Divider />
      </div>
    );
  }

  _setHydrographData() {
    let hydroData = {
      TEN: [],
      TWENTYFIVE: [],
      FIFTY: [],
      SEVENTYFIVE: [],
      NINTY: [],
      MIN: [],
      MAX: [],
    };

    let hydrographs;

    if (this.props.currentGauge) {
      hydrographs = this.props.currentGauge.hydrographs;
    } else if (this.props.currentClassification)
      hydrographs = this.props.currentClassification.hydrographs;

    if (hydrographs) {
      hydrographs.forEach(hydrograph => {
        hydrograph.data.forEach((ele, index) => {
          hydroData[hydrograph.percentille].push({
            date: index + 1,
            flow: ele,
          });
        });
      });
    }

    this.setState({ hydroCompareData: hydroData }, () => {
      this.setState({
        hydroData: {
          ...this.state.hydroUploadData,
          ...this.state.hydroCompareData,
        },
      });
    });
  }

  _setHydrographUploadData() {
    let hydroData = {
      ten: [],
      twenty_five: [],
      fifty: [],
      seventy_five: [],
      ninty: [],
      min: [],
      max: [],
    };

    Object.keys(this.props.data.DRH).forEach(hydrograph => {
      this.props.data.DRH[hydrograph].forEach((ele, index) => {
        hydroData[hydrograph].push({ date: index + 1, flow: ele });
      });
    });

    this.setState({ hydroUploadData: hydroData }, () => {
      this.setState({ hydroData: { ...this.state.hydroUploadData } }, () => {
        this._setHydrographData();
      });
    });
  }

  handleToggle(cent) {
    let plots = { ...this.state.plots };

    if (cent === "OVERLAY") plots["overlay"] = true;
    else plots[cent] = !this.state.plots[cent];

    this.setState({ plots }, () => {
      if (cent === "overlay" && !plots[cent]) {
        this.setState({ hydroData: { ...this.state.hydroUploadData } });
      } else
        this.setState({
          hydroData: {
            ...this.state.hydroUploadData,
            ...this.state.hydroCompareData,
          },
        });
    });
  }

  changePlotsColor() {
    let { overlay, min, max, ninty, fifty, ten, seventy_five, twenty_five } = {
      ...this.state.plots,
    };

    if (overlay) {
      colors.MAX = max ? Colors.MAX + "4D" : "rgba(0, 0, 0, 0)";
      colors.MIN = min ? Colors.MIN + "4D" : "rgba(0, 0, 0, 0)";
      colors.NINTY = Colors.NINTY + "4D";
      colors.FIFTY = Colors.FIFTY + "4D";
      colors.TEN = Colors.TEN + "4D";
      colors.SEVENTYFIVE = Colors.SEVENTYFIVE + "4D";
      colors.TWENTYFIVE = Colors.TWENTYFIVE + "4D";
    } else {
      colors.MAX = "rgba(0, 0, 0, 0)";
      colors.MIN = "rgba(0, 0, 0, 0)";
      colors.NINTY = "rgba(0, 0, 0, 0)";
      colors.FIFTY = "rgba(0, 0, 0, 0)";
      colors.TEN = "rgba(0, 0, 0, 0)";
      colors.SEVENTYFIVE = "rgba(0, 0, 0, 0)";
      colors.TWENTYFIVE = "rgba(0, 0, 0, 0)";
    }

    colors.min = min ? Colors.MIN : "rgba(0, 0, 0, 0)";
    colors.max = max ? Colors.MAX : "rgba(0, 0, 0, 0)";
    colors.ninty = ninty ? Colors.NINTY : "rgba(0, 0, 0, 0)";
    colors.fifty = fifty ? Colors.FIFTY : "rgba(0, 0, 0, 0)";
    colors.ten = ten ? Colors.TEN : "rgba(0, 0, 0, 0)";
    colors.seventy_five = seventy_five
      ? Colors.SEVENTYFIVE
      : "rgba(0, 0, 0, 0)";
    colors.twenty_five = twenty_five ? Colors.TWENTYFIVE : "rgba(0, 0, 0, 0)";
  }

  toggleMetricDrawer(action) {
    this.setState({ openDrawer: action });
  }

  _renderDRHs(hydroData) {
    this.changePlotsColor();

    if (hydroData) {
      return (
        <div>
          <div style={styles.plotTitle}>
            {"Dimensionless Reference Hydrograph"}
          </div>
          <Divider />
          <div
            style={{
              margin: "auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {(this.props.currentGauge || this.props.currentClassification) &&
            this.state.plots.overlay ? (
              <div style={{ float: "left", display: "flex" }}>
                <div style={{ float: "left" }}>
                  <FloatingActionButton
                    mini={true}
                    disabled={true}
                    disabledColor={"gray"}
                    style={{ margin: "10px" }}
                  >
                    <Compare />
                  </FloatingActionButton>
                </div>
                <div style={{ float: "right" }}>{this._renderTitleInfo()}</div>
              </div>
            ) : (
              <div style={{ height: "60px" }} />
            )}
            <div style={{ float: "right" }}>
              <RaisedButton
                className="tour-metricDetail-display"
                label="Display"
                backgroundColor={Colors.gold}
                labelColor={Colors.white}
                disabled={false}
                style={{ marginTop: "10px", marginRight: "10px" }}
                icon={<Setting />}
                labelStyle={{ fontSize: "12px" }}
                onClick={() => this.toggleMetricDrawer(true)}
              />
            </div>
          </div>

          <div style={styles.yLabel}>{"Daily flow / Average annual Flow"} </div>
          <svg
            width={750}
            height={450}
            ref={el => (this.svg = el)}
            style={{ cursor: "pointer", marginLeft: "30px" }}
          >
            <LinePlot
              x={410 / 10}
              y={25}
              width={700}
              height={400}
              data={this.state.hydroData}
              xValue={value => value.date}
              yValue={value => value.flow}
              highestKey={"ninty"}
              colors={colors}
              overLayBoxPlotData={[]}
              verticalOverlayBoxPlotData={[]}
              zoomTransform={this.state.zoomTransform}
              zoomType="detail"
            />
          </svg>
        </div>
      );
    }
  }

  async selectRowHandler(gaugeId) {
    await this.props.fetchCurrentGauge(gaugeId);
    this._setHydrographData();
    if (!this.state.plots.overlay) this.handleToggle("overlay");
  }

  render() {
    return (
      <React.Fragment>
        <Paper className="tour-hydro-general-display">
          {this._renderDRHs(this.state.hydroData)}
        </Paper>
        <MetricDrawer
          isDrawerOpen={this.state.openDrawer}
          closeDrawer={() => this.toggleMetricDrawer(false)}
          handleToggle={btn => this.handleToggle(btn)}
          plots={this.state.plots}
          currentClassification={this.props.currentClassification}
          currentGauge={this.props.currentGauge}
          classifications={this.props.classifications}
          fetchClassification={this.props.fetchClassification}
          updateHoveredGauge={this.props.updateHoveredGauge}
          fetchCurrentGauge={this.props.fetchCurrentGauge}
        />
      </React.Fragment>
    );
  }
}

Hydrograph.propTypes = {
  match: PropTypes.object,
  containerWidth: PropTypes.number,
  currentGauge: PropTypes.object,
  currentClassification: PropTypes.object,
  removeClassGaugeProps: PropTypes.func,
  overLayBoxPlotData: PropTypes.array,
  verticalOverlayBoxPlotData: PropTypes.array,
  data: PropTypes.object,
  gauge: PropTypes.array,
  fetchCurrentGauge: PropTypes.func,
  fetchClassification: PropTypes.func,
  classifications: PropTypes.array,
  updateHoveredGauge: PropTypes.func,
};

const styles = {
  banner: {
    backgroundColor: "#424242",
    height: "230px",
    zIndex: "0",
  },

  yLabel: {
    position: "absolute",
    fontSize: "14px",
    left: "20px",
    top: "235px",
    writingMode: "vertical-rl",
    transform: "rotate(-180deg)",
  },
  labels: {
    display: "flex",
    margin: "auto",
    justifyContent: "space-around",
    paddingBottom: "20px",
  },
  label: {
    height: "10px",
    width: "10px",
    marginTop: "0px",
  },
  graph: {
    width: "100%",
    marginBottom: "20px",
    borderRadius: "0px",
    overflow: "visible",
  },
  plotTitle: {
    marginTop: "10px",
    width: "100%",
    textAlign: "center",
    fontWeight: "500",
    fontSize: "16px",
    padding: "20px",
  },
  labelName: { fontSize: "14px" },
  minMax: {
    width: "180px",
    position: "absolute",
    right: "0px",
    top: "20px",
  },
  labelStyle: {
    fontSize: "16px",
    color: "#757575",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "96%",
    margin: "30px auto",
  },

  track: {
    height: "14px",
    borderRadius: "30",
  },
  thumb: {
    position: "absolute",
    top: "1px",
    left: "1px",
    width: "15px",
    height: "15px",
    lineHeight: "24px",
    borderRadius: "50%",
  },
};

export default Hydrograph;
