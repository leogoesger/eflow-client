import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { Paper, Divider, Toggle } from "material-ui";
import { CardHeader } from "material-ui/Card";

import { LinePlot } from "../shared/plots";
import { classInfo } from "../../constants/classification";

import { Colors } from "../../styles";
import SearchBar from "../../containers/SearchBar";

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
      hydroData: null,
      fallFlushTiming: false,
      fallWetTiming: false,
      springTiming: false,
      summerTiming: false,
      zoomTransform: null,
      plots: {
        overlay: true,
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
    this._setHydrographData();
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
      ten: [],
      twenty_five: [],
      fifty: [],
      seventy_five: [],
      ninty: [],
      min: [],
      max: [],
    };

    let hydrographs;
    hydrographs = this.props.currentGauge
      ? this.props.currentGauge.hydrographs
      : this.props.currentClassification.hydrographs;

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

    Object.keys(this.props.data.DRH).forEach(hydrograph => {
      this.props.data.DRH[hydrograph].forEach((ele, index) => {
        hydroData[hydrograph].push({ date: index + 1, flow: ele });
      });
    });

    this.setState({ hydroData: hydroData });
  }

  handleToggle(cent) {
    let plots = { ...this.state.plots };
    plots[cent] = !this.state.plots[cent];

    this.setState({ plots });
  }

  _renderPercentilleChips() {
    return (
      <div style={styles.labels}>
        {Object.keys(this.state.plots).map((cent, indx) => {
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
      colors.MAX = Colors.MAX;
      colors.max = Colors.max;
    } else {
      colors.MAX = "rgba(0, 0, 0, 0)";
      colors.max = "rgba(0, 0, 0, 0)";
    }

    if (ninty) {
      colors.ninty = Colors.ninty;
      colors.NINTY = Colors.NINTY;
    } else {
      colors.ninty = "rgba(0, 0, 0, 0)";
      colors.NINTY = "rgba(0, 0, 0, 0)";
    }
    if (fifty) {
      colors.fifty = Colors.fifty;
      colors.FIFTY = Colors.FIFTY;
    } else {
      colors.fifty = "rgba(0, 0, 0, 0)";
      colors.FIFTY = "rgba(0, 0, 0, 0)";
    }

    if (ten) {
      colors.ten = Colors.ten;
      colors.TEN = Colors.TEN;
    } else {
      colors.ten = "rgba(0, 0, 0, 0)";
      colors.TEN = "rgba(0, 0, 0, 0)";
    }

    if (seventy_five) {
      colors.seventy_five = Colors.seventy_five;
      colors.SEVENTYFIVE = Colors.SEVENTYFIVE;
    } else {
      colors.seventy_five = "rgba(0, 0, 0, 0)";
      colors.SEVENTYFIVE = "rgba(0, 0, 0, 0)";
    }

    if (twenty_five) {
      colors.twenty_five = Colors.twenty_five;
      colors.TWENTYFIVE = Colors.TWENTYFIVE;
    } else {
      colors.twenty_five = "rgba(0, 0, 0, 0)";
      colors.TWENTYFIVE = "rgba(0, 0, 0, 0)";
    }
  }

  _renderDRHs(hydroData) {
    this.changePlotsColor();

    if (hydroData) {
      return (
        <div>
          {this._renderTitleInfo()}
          <div style={styles.plotTitle}>
            {"Dimensionless Reference Hydrograph"}
          </div>
          <div style={styles.yLabel}>{"Daily flow / Average annual Flow"} </div>
          <svg
            width={620}
            height={400}
            ref={el => (this.svg = el)}
            style={{ cursor: "pointer", marginLeft: "10px" }}
          >
            <LinePlot
              x={this.props.containerWidth / 10}
              y={25}
              width={550}
              height={300}
              data={this.state.hydroData}
              xValue={value => value.date}
              yValue={value => value.flow}
              highestKey={"NINTY"}
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

  render() {
    return (
      <Paper style={styles.graph} className="tour-hydro-general-display">
        {this._renderDRHs(this.state.hydroData)}
        {this._renderPercentilleChips()}
        <div
          style={{
            width: "90%",
            margin: "auto",
            paddingTop: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div style={{ fontWeight: "bold" }}>Compare with: </div>
          <div>
            <SearchBar
              selectRowHandler={gauge => this.props.fetchCurrentGauge(gauge.id)}
            />
          </div>
        </div>
      </Paper>
    );
  }
}

Hydrograph.propTypes = {
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
  yLabel: {
    position: "absolute",
    fontSize: "14px",
    left: "35px",
    top: "260px",
    writingMode: "vertical-rl",
    transform: "rotate(-180deg)",
  },
  labels: {
    width: "80%",
    display: "flex",
    justifyContent: "space-around",
    position: "absolute",
    top: "580px",
    left: "40px",
  },
  label: {
    height: "10px",
    width: "10px",
    marginTop: "0px",
  },
  graph: {
    height: "600px",
    width: "650px",
    marginBottom: "20px",
    borderRadius: "0px",
  },
  plotTitle: {
    marginTop: "40px",
    width: "100%",
    textAlign: "center",
    fontWeight: "500",
    fontSize: "16px",
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
