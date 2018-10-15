import React from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";

import MetricNavbar from "./MetricNavbar";
import MetricOverviewCard from "./MetricOverviewCard";
import MetricGaugeCard from "./MetricGaugeCard";

export default class Layout extends React.Component {
  _getAllClassesBoxPlots() {
    if (this.props.allClassesBoxPlots) {
      const newBoxPlots = cloneDeep(this.props.allClassesBoxPlots);
      newBoxPlots.Winters.magWet = this.props.allClassesBoxPlots.FallWinters.magWet;
      delete newBoxPlots.FallWinters;
      return newBoxPlots;
    }
  }

  _renderDetailCard() {
    if (this.props.annualFlowData) {
      return (
        <MetricGaugeCard
          annualFlowData={this.props.annualFlowData}
          fetchAnnualFlowData={d => this.props.fetchAnnualFlowData(d)}
          toggleMetricGaugeDrawer={status =>
            this.props.toggleMetricGaugeDrawer(status)
          }
          logScale={this.props.logScale}
          toggledMetrics={this.props.toggledMetrics}
          isHydrographOverlay={this.props.isHydrographOverlay}
          hydrograph={this.props.hydrograph}
          fixedYaxisPercentile={this.props.fixedYaxisPercentile}
          yMax={this.props.yMax}
        />
      );
    } else {
      return (
        <MetricOverviewCard
          fetchAllClassesBoxPlots={() => this.props.fetchAllClassesBoxPlots()}
          loading={this.props.loading}
          allClassesBoxPlots={this._getAllClassesBoxPlots()}
        />
      );
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <MetricNavbar
          classifications={this.props.classifications}
          fetchAnnualFlowData={d => this.props.fetchAnnualFlowData(d)}
          fetchHydrographOverlay={d => this.props.fetchHydrographOverlay(d)}
          isHydrographOverlay={this.props.isHydrographOverlay}
          currentGaugeId={
            this.props.annualFlowData
              ? this.props.annualFlowData.Gauge.id
              : null
          }
          fixedYaxisPercentile={this.props.fixedYaxisPercentile}
          getYaxisMax={(id, percentile) =>
            this.props.getYaxisMax(id, percentile)
          }
        />
        {this._renderDetailCard()}
      </div>
    );
  }
}

Layout.propTypes = {
  fetchAnnualFlowData: PropTypes.func,
  classifications: PropTypes.array,
  annualFlowData: PropTypes.object,
  fetchAllClassesBoxPlots: PropTypes.func,
  loading: PropTypes.bool,
  allClassesBoxPlots: PropTypes.object,
  toggleMetricGaugeDrawer: PropTypes.func,
  logScale: PropTypes.bool,
  toggledMetrics: PropTypes.array,
  isHydrographOverlay: PropTypes.bool,
  fetchHydrographOverlay: PropTypes.func,
  hydrograph: PropTypes.object,
  yMax: PropTypes.number,
  getYaxisMax: PropTypes.func,
  fixedYaxisPercentile: PropTypes.number,
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-around",
    margin: "-60px auto 100px auto",
    height: "100%",
    overflow: "scroll",
    width: "1200px",
  },
};
