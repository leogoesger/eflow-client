import React from "react";
import PropTypes from "prop-types";

import { IconMenu, IconButton, MenuItem } from "material-ui";
import FileDownload from "material-ui/svg-icons/file/file-download";
import { CSVLink } from "react-csv";
import { Colors } from "../../styles";
// import { Tooltip } from 'react-tippy';

class Download extends React.Component {
  getDRH() {
    return [
      ["min", ...this.props.data.DRH.min],
      ["max", ...this.props.data.DRH.max],
      ["ten", ...this.props.data.DRH.ten],
      ["twentyFive", ...this.props.data.DRH.twenty_five],
      ["fifty", ...this.props.data.DRH.fifty],
      ["seventyFive", ...this.props.data.DRH.seventy_five],
      ["ninty", ...this.props.data.DRH.ninty],
    ];
  }

  getFlowMatrix() {
    return [this.props.data.yearRanges, ...this.props.data.flowMatrix];
  }

  getFlowResult() {
    const {
      allYear,
      fall,
      spring,
      summer,
      winter,
      fallWinter,
      yearRanges,
    } = this.props.data;

    let result = [
      ["Year", ...yearRanges],
      ["Std", ...allYear.standard_deviations],
      ["Avg", ...allYear.average_annual_flows],
      ["CV", ...allYear.coefficient_variations],
      ["FA_Mag", ...fall.magnitudes],
      ["FA_Tim", ...fall.timings_water],
      ["FA_Dur", ...fall.durations],
      ["Wet_BFL_Mag_10", ...fallWinter.baseflows_10],
      ["Wet_BFL_Mag_50", ...fallWinter.baseflows_50],

      ["Peak_2", ...winter.magnitudes["fifty"]],
      ["Peak_5", ...winter.magnitudes["twenty"]],
      ["Peak_10", ...winter.magnitudes["ten"]],
      ["Peak_Dur_2", ...winter.durations["fifty"]],
      ["Peak_Dur_5", ...winter.durations["twenty"]],
      ["Peak_Dur_10", ...winter.durations["ten"]],
      ["Peak_Fre_2", ...winter.frequencys["fifty"]],
      ["Peak_Fre_5", ...winter.frequencys["twenty"]],
      ["Peak_Fre_10", ...winter.frequencys["ten"]],

      ["SP_Mag", ...spring.magnitudes],
      ["SP_Tim", ...spring.timings_water],
      ["SP_Dur", ...spring.durations],
      ["SP_ROC", ...spring.rocs],

      ["DS_Mag_50", ...summer.magnitudes_fifty],
      ["DS_Mag_90", ...summer.magnitudes_ninety],
      ["DS_Tim", ...summer.timings_water],
      ["DS_Dur_WS", ...summer.durations_wet],
      // ['DS_Dur_WSI', ...summer.durations_flush],
      // ["DS_No_Flow", ...summer.no_flow_counts],

      // ['Peak_Mag_2', ...winter.magnitudes['two']],
      // ['Peak_Mag_5', ...winter.magnitudes['five']],
      // ["Peak_Mag_10", ...winter.magnitudes["ten"]],
      // ['Peak_Tim_20', ...winter.timings['twenty']],
      // ["Peak_Fre_20", ...winter.frequencys["twenty"]],
      // ["Peak_Dur_20", ...winter.durations["twenty"]],
      // ["Peak_Mag_20", ...winter.magnitudes["twenty"]],
      // ["Peak_Dur_50", ...winter.durations["fifty"]],
      // ["Peak_Fre_50", ...winter.frequencys["fifty"]],
      // ["Peak_Mag_50", ...winter.magnitudes["fifty"]],
    ];

    if (spring.timings_water) {
      result.splice(9, 0, ["Wet_Tim_Water", ...fallWinter.wet_timings_water]);
      result.splice(10, 0, ["Wet_BFL_Dur", ...fallWinter.bfl_durs]);
      // result = [
      //   ...result,
      //   ["SP_Tim_Water", ...spring.timings_water],
      //   ["DS_Tim_Water", ...summer.timings_water],
      //   ["FA_Tim_Water", ...fall.timings_water],
      //   ["Wet_Tim_Water", ...fallWinter.wet_timings_water],
      //   ['Peak_Tim_2_Water', ...winter.timings['two_water']],
      //   ['Peak_Tim_5_Water', ...winter.timings['five_water']],
      //   ['Peak_Tim_10_Water', ...winter.timings['ten_water']],
      //   ['Peak_Tim_20_Water', ...winter.timings['twenty_water']],
      // ];
    }

    return result
  }

  render() {
    return (
      <IconMenu
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        targetOrigin={{ horizontal: "right", vertical: "top" }}
        iconButtonElement={
          // <Tooltip title={'Download'} position="top" arrow={true}>
          <IconButton>
            <FileDownload color={Colors.gold} />
          </IconButton>
          // </Tooltip>
        }
      >
        <MenuItem>
          <CSVLink
            data={this.getFlowMatrix()}
            filename={`annual_flow_matrix.csv`}
          >
            <div
              style={{
                textDecoration: "none",
                color: Colors.grey,
                width: "100%",
              }}
            >
              Annual Flow Matrix
            </div>
          </CSVLink>
        </MenuItem>
        <MenuItem>
          <CSVLink data={this.getDRH()} filename={`flow_DRH.csv`}>
            <div
              style={{
                textDecoration: "none",
                color: Colors.grey,
                width: "100%",
              }}
            >
              DRH
            </div>
          </CSVLink>
        </MenuItem>
        <MenuItem>
          <CSVLink
            data={this.getFlowResult()}
            filename={`annual_flow_result.csv`}
          >
            <div
              style={{
                textDecoration: "none",
                color: Colors.grey,
                width: "100%",
              }}
            >
              Annual Flow Result
            </div>
          </CSVLink>
        </MenuItem>
        <MenuItem
          style={{ color: "rgb(97, 97, 97)" }}
          primaryText="Metrics Read Me"
          onClick={() =>
            window.open(
              "https://funcflow.s3-us-west-1.amazonaws.com/resources/Metrics_reference.csv"
            )
          }
        />
      </IconMenu>
    );
  }
}

Download.propTypes = {
  data: PropTypes.object,
};
export default Download;
