import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import Slider from "material-ui/Slider";
import Paper from "material-ui/Paper";
// import RaisedButton from "material-ui/RaisedButton";
// import IconMenu from "material-ui/IconMenu";
// import MenuItem from "material-ui/MenuItem";
// import FlatButton from "material-ui/FlatButton";
// import Setting from "material-ui/svg-icons/action/settings";
// import FileDownload from "material-ui/svg-icons/file/file-download";
// import { Tooltip } from "react-tippy";

import Card, { CardHeader } from "material-ui/Card";
import Divider from "material-ui/Divider";
import { SimpleLinePlot } from "../../shared/plots";
//import { classInfo } from "../../../constants/classification";
import { Colors } from "../../../styles";
import ErrorBoundary from "../../shared/ErrorBoundary";

class MetricCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: this.props.data.yearRanges[0],
      zoomTransform: null,
      isDrawerOpen: false,
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
  }

  componentDidUpdate() {
    d3.select(this.svg).call(this.zoom);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.data.Years.gaugeId !== this.props.data.Years.gaugeId) {
  //     this.setState({ currentYear: nextProps.data.Years.year[0] });
  //   }
  // }

  zoomed() {
    this.setState({
      zoomTransform: d3.event.transform,
    });
  }

  _toggleDrawer() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  }

  async _handleSlider(e, v) {
    await this.setState({ currentYear: v });
  }

  _getdata(annualFlowData) {
    const filteredData = annualFlowData.filter(d => d !== null);

    const flowObjects = filteredData.map((d, i) => {
      if (d) {
        return { date: i, flow: Number(d) };
      }
    });
    return flowObjects;
  }

  _renderSliderHelper() {
    const year = this.props.data.yearRanges;
    return (
      <div
        style={{
          display: "flex",
          width: "780px",
          margin: "0 auto",
          justifyContent: "space-around",
          fontSize: "14px",
          color: Colors.lightGrey,
        }}
      >
        <div>{year[0]}</div>
        <div>{"Slide the bar to change the water year!"}</div>
        <div>{Number(year[year.length - 1])}</div>
      </div>
    );
  }

  // _renderYearStatus(condition) {
  //   return (
  //     <div
  //       style={{
  //         marginTop: "-15px",
  //         display: "flex",
  //         justifyContent: "flex-end",
  //         marginRight: "20px",
  //       }}
  //     >
  //       {this.state.currentYear > this.props.data.Gauge.unimpairedEndYear ||
  //       this.state.currentYear < this.props.data.Gauge.unimpairedStartYear ? (
  //         <span
  //           style={{ color: Colors.blue, fontSize: "14px", fontWeight: "700" }}
  //           className="tour-metricDetail-impairedStatus"
  //         >
  //           <Tooltip title={"Water Year Type"} position="top" arrow={true}>
  //             {condition}
  //           </Tooltip>
  //           {" | "}
  //           <Tooltip title={"Alteration Status"} position="top" arrow={true}>
  //             {"Impaired"}
  //           </Tooltip>
  //         </span>
  //       ) : (
  //         <span
  //           style={{ color: Colors.blue, fontSize: "14px", fontWeight: "700" }}
  //           className="tour-metricDetail-impairedStatus"
  //         >
  //           <Tooltip title={"Water Year Type"} position="top" arrow={true}>
  //             {condition}
  //           </Tooltip>
  //           {" | "}
  //           <Tooltip title={"Alteration Status"} position="top" arrow={true}>
  //             {"Unimpaired"}
  //           </Tooltip>
  //         </span>
  //       )}
  //     </div>
  //   );
  // }

  populateAnnualFlowData(flowMatrix) {
    const yearIndx = this.props.data.yearRanges.findIndex(
      year => year === this.state.currentYear
    );
    const annualFlowData = [];

    flowMatrix.map(d => {
      annualFlowData.push(d[yearIndx]);
    });
    return annualFlowData;
  }

  _renderAnnualPlot() {
    if (!this.props.data.flowMatrix) {
      return (
        <div style={{ height: "399px", margin: "0 auto" }}>
          <p style={{ paddingTop: "200px", paddingLeft: "185px" }}>
            {":( Sorry, could not get annual flow data for this gauge!"}
          </p>
        </div>
      );
    }
    const { flowMatrix } = this.props.data;
    const annualFlowData = this.populateAnnualFlowData(flowMatrix);
    const filteredData = annualFlowData.filter(d => d === null);

    if (filteredData.length > 200) {
      return (
        <div style={{ height: "429px", margin: "0 auto" }}>
          <p style={{ paddingTop: "160px", paddingLeft: "220px" }}>
            {":( Sorry, too many NaN for the plot! Slide forward or backword"}
          </p>
        </div>
      );
    }

    return (
      <ErrorBoundary>
        <React.Fragment>
          <div style={styles.yLabel}>{"Flow Value (cfs)"}</div>
          <div style={styles.xLabel}>{`Water year hydrograph for ${
            this.state.currentYear
          }`}</div>
          {/* {this._renderYearStatus(this.props.data.condition)} */}
          <div style={{ marginLeft: "20px" }}>
            <svg
              width={700}
              height={380}
              ref={el => (this.svg = el)}
              style={{ cursor: "pointer" }}
            >
              <SimpleLinePlot
                x={70}
                y={20}
                width={650}
                height={325}
                data={this._getdata(annualFlowData)}
                xValue={val => Number(val.date)}
                yValue={val => Number(val.flow)}
                color={Colors.blue}
                zoomTransform={this.state.zoomTransform}
                zoomType="detail"
                logScale={false}
                isHydrographOverlay={false}
                hydrograph={this.props.data.DRH}
                toggledMetrics={null}
                annualFlowData={null}
                yMax={null}
                fixedYaxisPercentile={null}
              />
            </svg>
          </div>
        </React.Fragment>
      </ErrorBoundary>
    );
  }

  render() {
    if (!this.props.data) {
      return null;
    }
    return (
      <Card style={styles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CardHeader
            style={{ padding: "20px", margin: "auto" }}
            title="Annual Flow Plot"
            textStyle={{ paddingRight: "0px" }}
            actAsExpander={false}
            showExpandableButton={false}
          />

          {/* <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "40%",
              marginTop: "10px",
            }}
          >
            <IconMenu
              iconButtonElement={
                <FlatButton
                  className="tour-metricDetail-download"
                  label="Download"
                  style={{ marginLeft: "20px", marginTop: "10px" }}
                  labelStyle={{ fontSize: "12px", color: Colors.gold }}
                  icon={<FileDownload color={Colors.gold} />}
                />
              }
            >
              <MenuItem
                primaryText="Annual Flow Matrix"
                onClick={() => {
                  const url1 = `${process.env.S3_BUCKET}annual_flow_matrix/${
                    data.Gauge.id
                  }.csv`;
                  return window.open(url1);
                }}
              />
              <MenuItem
                primaryText="Annual Metric Result"
                onClick={() => {
                  const url2 = `${process.env.S3_BUCKET}annual_flow_result/${
                    data.Gauge.id
                  }_annual_result_matrix.csv`;
                  return window.open(url2);
                }}
              />
              <MenuItem
                primaryText="Metrics Read Me"
                onClick={() =>
                  window.open(
                    "https://s3-us-west-1.amazonaws.com/funcflow/resources/Reference_Data.csv"
                  )
                }
              />
            </IconMenu>

            <div>
              <RaisedButton
                className="tour-metricDetail-display"
                label="Display"
                backgroundColor={Colors.gold}
                labelColor={Colors.white}
                disabled={false}
                style={{ marginTop: "10px", marginRight: "10px" }}
                icon={<Setting />}
                labelStyle={{ fontSize: "12px" }}
                onClick={() => this.props.toggleMetricGaugeDrawer(true)}
              />
            </div>
          </div> */}
        </div>
        <Divider />

        <Paper
          style={{
            width: "auto",
            overflow: "hidden",
            margin: "auto",
            position: "relative",
          }}
        >
          {this._renderAnnualPlot()}
        </Paper>

        <Slider
          className="tour-metricDetail-slider"
          min={this.props.data.yearRanges[0]}
          max={
            this.props.data.yearRanges[this.props.data.yearRanges.length - 1] ||
            this.props.data.Years.year[0] + 5
          }
          sliderStyle={{ marginBottom: "10px" }}
          step={1}
          style={{ width: "600px", margin: "0 auto" }}
          value={this.state.currentYear}
          onChange={(e, v) => this._handleSlider(e, v)}
        />
        {this._renderSliderHelper()}
      </Card>
    );
  }
}

MetricCard.propTypes = {
  data: PropTypes.object,
};

const styles = {
  container: {
    // width: "80%",
    height: "570px",
    overflow: "scroll",
    // margin: "0 auto",
  },
  title: {
    marginTop: "10px",
    width: "100%",
    textAlign: "center",
    fontWeight: "500",
    fontSize: "16px",
    padding: "20px",
  },
  yLabel: {
    position: "absolute",
    fontSize: "16px",
    left: "20px",
    top: "140px",
    color: "#616161",
    writingMode: "vertical-rl",
    transform: "rotate(-180deg)",
  },
  xLabel: {
    width: "100%",
    paddingTop: "20px",
    margin: "5px 0px 5px 275px",
  },
};
export default MetricCard;
