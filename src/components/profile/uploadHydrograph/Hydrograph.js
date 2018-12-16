import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { Paper, Divider, Toggle, Dialog, FlatButton } from "material-ui";
import { CardHeader } from "material-ui/Card";
import FloatingActionButton from "material-ui/FloatingActionButton";

import Compare from "material-ui/svg-icons/action/compare-arrows";

import { LinePlot } from "../../shared/plots";
import { classInfo } from "../../../constants/classification";

import { Colors } from "../../../styles";
import SearchBar from "../../../containers/SearchBar";

const colors = {
  NINTY: Colors.NINTY,
  SEVENTYFIVE: Colors.SEVENTYFIVE,
  FIFTY: Colors.FIFTY,
  TWENTYFIVE: Colors.TWENTYFIVE,
  TEN: Colors.TEN,
  MAX: Colors.MAX,
  MIN: Colors.MIN,
  ninty: Colors.ninty,
  seventy_five: Colors.seventy_five,
  fifty: Colors.fifty,
  ten: Colors.ten,
  twenty_five: Colors.twenty_five,
  min: Colors.min,
  max: Colors.max,
};

const percentileMap = {
  ten: "10th",
  twenty_five: "25th",
  fifty: "50th",
  seventy_five: "75th",
  ninty: "90th",
  min: "Min",
  max: "Max",
};

class Hydrograph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      displayToggle: false,
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
        seventy_five: false,
        fifty: false,
        twenty_five: false,
        ten: false,
      },
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
    this.displayToggle();
    this._setHydrographUploadData();
  }

  displayToggle() {
    if (!this.props.currentGauge && !this.props.currentClassification)
      this.setState({ displayToggle: false });
    else this.setState({ displayToggle: true });
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
      this._setHydrographData(nextProps);
    }
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
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
    plots[cent] = !this.state.plots[cent];

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

  _renderPercentilleChips() {
    return (
      <div style={styles.labels}>
        {Object.keys(this.state.plots).map((cent, indx) => {
          if (cent !== "overlay")
            return (
              <span key={indx} onClick={() => this.handleToggle(cent)}>
                <Toggle
                  label={percentileMap[cent]}
                  toggled={this.state.plots[cent]}
                  style={styles.track}
                />
              </span>
            );
        })}
      </div>
    );
  }

  changePlotsColor() {
    let { overlay, min, max, ninty, fifty, ten, seventy_five, twenty_five } = {
      ...this.state.plots,
    };

    if (min) {
      colors.MIN = overlay ? Colors.MIN : "rgba(0, 0, 0, 0)";
      colors.min = Colors.min;
    } else {
      colors.MIN = "rgba(0, 0, 0, 0)";
      colors.min = "rgba(0, 0, 0, 0)";
    }

    if (max) {
      colors.MAX = overlay ? Colors.MAX : "rgba(0, 0, 0, 0)";
      colors.max = Colors.max;
    } else {
      colors.MAX = "rgba(0, 0, 0, 0)";
      colors.max = "rgba(0, 0, 0, 0)";
    }

    if (ninty) {
      colors.ninty = Colors.ninty;
      colors.NINTY = overlay ? Colors.NINTY : "rgba(0, 0, 0, 0)";
    } else {
      colors.ninty = "rgba(0, 0, 0, 0)";
      colors.NINTY = "rgba(0, 0, 0, 0)";
    }
    if (fifty) {
      colors.fifty = Colors.fifty;
      colors.FIFTY = overlay ? Colors.FIFTY : "rgba(0, 0, 0, 0)";
    } else {
      colors.fifty = "rgba(0, 0, 0, 0)";
      colors.FIFTY = "rgba(0, 0, 0, 0)";
    }

    if (ten) {
      colors.ten = Colors.ten;
      colors.TEN = overlay ? Colors.TEN : "rgba(0, 0, 0, 0)";
    } else {
      colors.ten = "rgba(0, 0, 0, 0)";
      colors.TEN = "rgba(0, 0, 0, 0)";
    }

    if (seventy_five) {
      colors.seventy_five = Colors.seventy_five;
      colors.SEVENTYFIVE = overlay ? Colors.SEVENTYFIVE : "rgba(0, 0, 0, 0)";
    } else {
      colors.seventy_five = "rgba(0, 0, 0, 0)";
      colors.SEVENTYFIVE = "rgba(0, 0, 0, 0)";
    }

    if (twenty_five) {
      colors.twenty_five = Colors.twenty_five;
      colors.TWENTYFIVE = overlay ? Colors.TWENTYFIVE : "rgba(0, 0, 0, 0)";
    } else {
      colors.twenty_five = "rgba(0, 0, 0, 0)";
      colors.TWENTYFIVE = "rgba(0, 0, 0, 0)";
    }
  }

  _renderDRHs(hydroData) {
    const actions = [
      <FlatButton
        key={1}
        label="Cancel"
        primary={true}
        onClick={() => this.handleClose()}
      />,
    ];
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
            }}
          >
            <div style={{ float: "left" }}>
              <FloatingActionButton
                mini={true}
                style={{ margin: "10px" }}
                onClick={() => this.handleOpen()}
              >
                <Compare />
              </FloatingActionButton>
              <Dialog
                title="Compare With:"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
              >
                <SearchBar
                  selectRowHandler={gauge => this.selectRowHandler(gauge.id)}
                />
              </Dialog>
              <div />
            </div>
            <div style={{ float: "right" }}>{this._renderTitleInfo()}</div>
            {this.state.displayToggle && (
              <span
                style={{ paddingTop: "18px" }}
                onClick={() => this.handleToggle("overlay")}
              >
                <Toggle
                  toggled={this.state.plots.overlay}
                  style={styles.track}
                />
              </span>
            )}
          </div>

          <div style={styles.yLabel}>{"Daily flow / Average annual Flow"} </div>
          <svg
            width={620}
            height={400}
            ref={el => (this.svg = el)}
            style={{ cursor: "pointer", marginLeft: "10px" }}
          >
            <LinePlot
              x={410 / 10}
              y={25}
              width={550}
              height={300}
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
    this.displayToggle();
    this.handleClose();
  }

  render() {
    return (
      <React.Fragment>
        <Paper style={styles.graph} className="tour-hydro-general-display">
          {this._renderDRHs(this.state.hydroData)}
          {this._renderPercentilleChips()}
        </Paper>
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
};

const styles = {
  banner: {
    backgroundColor: "#424242",
    height: "230px",
    zIndex: "0",
  },
  paperStyle: {
    height: "600px",
    margin: "-60px auto 160px auto",
    width: "1000px",
    zIndex: "2",
    overflow: "scroll",
  },
  yLabel: {
    position: "absolute",
    fontSize: "14px",
    left: "35px",
    top: "260px",
    writingMode: "vertical-rl",
    transform: "rotate(-180deg)",
  },
  labels: {
    display: "flex",
    margin: "auto",
    justifyContent: "space-around",
    paddingBottom: "20px",
    //   position: "absolute",
    //   top: "600px",
  },
  label: {
    height: "10px",
    width: "10px",
    marginTop: "0px",
  },
  graph: {
    height: "auto",
    width: "100%",
    marginBottom: "20px",
    borderRadius: "0px",
    overflow: "visible",
  },
  plotTitle: {
    marginTop: "40px",
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
