import React from "react";
import PropTypes from "prop-types";
import { Paper, Divider } from "material-ui";
import { cloneDeep } from "lodash";

import Uploader from "../../containers/Uploader";
import { Colors } from "../../styles";

import UploadData from "./UploadData";

const ProfileLayout = ({
  currentUser,
  getMe,
  currentGauge,
  gauges,
  fetchCurrentGauge,
}) => {
  if (!currentUser) {
    return null;
  }

  const sortedData = cloneDeep(currentUser.uploadData).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <React.Fragment>
      <div style={styles.banner} />
      <Paper style={styles.paperStyle}>
        <div
          style={{ fontSize: "36px", margin: "40px 20px 20px 20px" }}
        >{`Welcome, ${currentUser.firstName}`}</div>

        <div style={{ margin: "40px 20px 20px 20px", color: Colors.grey }}>
          <div style={{ lineHeight: "20px" }}>
            Upload your time series data here. The application requires a commas
            separated values (.csv) file with two columns: column 1 contains
            dates (mm/dd/yyyy) and column 2 contains the corresponding daily
            flow (cfs). The columns must have the following exact headers:
            <span style={{ fontWeight: "bold" }}>date</span> for the dates
            column and the <span style={{ fontWeight: "bold" }}>flow</span> for
            the flow column. Any gaps in the data will be interpolated. Please
            download{" "}
            <a
              href="https://s3-us-west-1.amazonaws.com/funcflow/resources/sample.csv"
              style={{ color: Colors.gold }}
            >
              this sample csv file
            </a>{" "}
            for a data format example.
          </div>
          <Uploader enabled={currentUser.uploadData.length < 5} />
        </div>
        <div>
          <Divider style={{ margin: "0px" }} />
        </div>
        {!sortedData.length && (
          <div style={{ margin: "40px 20px" }}>
            {
              "Looks like you haven't uploaded any data yet. Try uploading some time series data!"
            }
          </div>
        )}
        <div style={{ marginTop: "20px" }}>
          {sortedData.map(d => (
            <UploadData
              indx={currentUser.uploadData.findIndex(
                data => data.name === d.name
              )}
              key={d.id}
              data={d}
              getMe={getMe}
              currentGauge={currentGauge}
              gauges={gauges}
              fetchCurrentGauge={fetchCurrentGauge}
            />
          ))}
        </div>
      </Paper>
    </React.Fragment>
  );
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
  warningIcon: { color: "#616161", height: "60px", width: "60px" },
};

ProfileLayout.propTypes = {
  currentUser: PropTypes.object || null,
  getMe: PropTypes.func,
  currentGauge: PropTypes.object,
  gauges: PropTypes.array,
  fetchCurrentGauge: PropTypes.func,
};

export default ProfileLayout;
